import { BaseCommand } from '../../Classes/Command';
import { Bot } from '../../Classes/Bot';
import { CommandInteraction } from 'discord.js';

export default class Ping extends BaseCommand {
	constructor (client: Bot) {
		super(client, {
			filename: __filename,
			description: 'Get response time of the bot.',
			memberPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES']
		});
	}

	async run (interaction: CommandInteraction) {
		await interaction.reply('Pong!');
	}
}