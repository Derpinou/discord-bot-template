import { Bot } from '../../Classes/Bot';
import { BaseEvent } from '../../Classes/Event';
import { ChatInputCommandInteraction, Guild, GuildMember, PermissionsString, TextChannel } from 'discord.js';

export default class CommandInteractionCreate extends BaseEvent {
	constructor (client: Bot) {
		super(client);
	}

	async run (interaction: ChatInputCommandInteraction) {
		const cmd = this.client.commands.get(interaction.commandName);
		if (!cmd) return await interaction.reply({
			content: ':x: error'
		});
		if (interaction.inGuild()) {
			const neededPermissions: PermissionsString[] = [];
			cmd.conf.botPermissions.forEach((perm) => {
				if(!(interaction.channel as TextChannel).permissionsFor((interaction.guild as Guild).members.me as GuildMember).has(perm)){
					neededPermissions.push(perm);
				}
			});
			if(neededPermissions.length > 0) {
				return interaction.reply({
					content: 'I need the following permissions to execute this command:' + neededPermissions.map((p) => `\`${p}\``).join(', '),
					ephemeral: true
				});
			}
		}
		return cmd.run({ 
			name: interaction.commandName,
			interaction: interaction
		});
	}
}