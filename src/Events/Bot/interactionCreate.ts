import { Bot } from '../../Classes/Bot';
import { BaseEvent } from '../../Classes/Event';
import { ChatInputCommandInteraction, Interaction, InteractionType } from 'discord.js';

export default class InteractionCreate extends BaseEvent {
	constructor (client: Bot) {
		super(client);
	}

	run (interaction: Interaction): void {

		switch(interaction.type) {

		case InteractionType.ApplicationCommand:
			this.client.emit('commandInteractionCreate', (interaction as ChatInputCommandInteraction));
			break;

		
		case InteractionType.ApplicationCommandAutocomplete:
			this.client.commands.get(interaction.commandName)?.autocompleteFn(interaction);
			break;
		}

	}
}