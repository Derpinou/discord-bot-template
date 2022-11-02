import { BaseCommand } from '../../Classes/Command';
import { Bot } from '../../Classes/Bot';
import { CommandData } from '../../Types/globals';

export default class Ping extends BaseCommand {
	constructor (client: Bot) {
		super(client, {
			filename: __filename,
			description: 'Get response time of the bot.',
			memberPermissions: ['SendMessages', 'ManageMessages']
		});
	}

	async run ({ interaction, name }: CommandData) {
		await interaction.reply({
			embeds: [{
				title: name, // Display the name of the command
				description: `Api latency ${this.client.ws.ping}`
			}]
		});
	}
}