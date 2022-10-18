import { Application, Client, Collection } from 'discord.js';
import { Config } from '../Types/config';
import { readdir } from 'fs/promises';
import { BotHandlerType, EventsEmitterTypes } from '../Types/globals';
import { BaseCommand } from './Command';
import { BaseEvent } from './Event';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export class Bot extends Client {
	private readonly commandsCollection: Collection<string, BaseCommand>;
	constructor (_config: Config) {
		super(_config);
		this.commandsCollection = new Collection<string, BaseCommand>();
		this.init(_config).catch(console.error);
	}

	get commands (): Collection<string, BaseCommand> {
		return this.commandsCollection;
	}

	private async init (config: Config) {
		await this.handler('Events').catch(console.error);
		await this.handler('Commands').catch(console.error);
		await this.login(process.env.TOKEN).catch(console.error);
		if (config.deployCommands) {
			await this.deployCommands().catch(console.error);
		}
	}

	private async handler (type : BotHandlerType): Promise<void> {
		const dirs = await Bot.getDirs(type);
		if (!dirs || !dirs.length) return;
		for (const dir of dirs) {
			const files = await Bot.getFilesFromPath(`./dist/src/${type}/${dir}`);
			for (const file of files) {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const jsFile = new (require(`../${type}/${dir}/${file}`).default)(this);
				if (type === 'Commands') await this.loadCommand(jsFile);
				else if (type === 'Events') await this.loadEvent(jsFile, file);
			}
		}
	}

	private static async getDirs (type: BotHandlerType): Promise<string[]> {
		return readdir(`./dist/src/${type}`).then(dirNames => {
			return dirNames.filter(dir => !dir.includes('.'));
		});
	}

	private static async getFilesFromPath (path: string): Promise<string[]> {
		return readdir(path).then(fileNames => {
			return fileNames.filter(file => file.endsWith('.js'));
		});
	}

	private async loadCommand (command: BaseCommand) {
		console.log(`${command.constructor.name} event loaded. 👌`);
		this.commandsCollection.set(command.conf.name, command);
	}

	private async loadEvent (event: BaseEvent, filename: string) {
		console.log(`${event.constructor.name} event loaded. 👌`);

		switch(event.emitter) {
		case EventsEmitterTypes.Client:
			this.on(filename.split('.')[0], event.run.bind(event));
			break;

		case EventsEmitterTypes.Process:
			process.on(filename.split('.')[0], event.run.bind(event));
			break;
		}
	}

	private async deployCommands () {
		const commands = this.commands.map(command => command.applicationCommandBody);
		const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
		console.log('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationGuildCommands((this.application as Application).id, process.env.GUILD_ID), { body: commands });
		console.log('Successfully reloaded application (/) commands.');
	}
}