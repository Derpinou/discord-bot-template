import { Bot } from '../../Classes/Bot';
import { BaseEvent } from '../../Classes/Event';
import { CommandInteraction, Interaction } from 'discord.js';

export default class InteractionCreate extends BaseEvent {
	constructor (client: Bot) {
		super(client);
	}

	run (interaction: Interaction): void {
		if (interaction.isCommand()) {
			this.client.emit('commandInteractionCreate', (interaction as CommandInteraction));
		}
	}
}