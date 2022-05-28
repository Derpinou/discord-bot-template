import { Bot } from './Bot';
import { CommandInteraction, Permissions, PermissionString } from 'discord.js';
import { CommandConf, CommandOptions, ExtendedRESTPostAPIApplicationCommandsJSONBody } from '../Types/globals';
import { sep } from 'path';

export abstract class BaseCommand {
	protected client: Bot;
	private readonly name: string;
	public conf: CommandConf;
	public applicationCommandBody: ExtendedRESTPostAPIApplicationCommandsJSONBody;
	protected constructor (client: Bot, {
		filename = 'Unknown',
		memberPermissions = [],
		botPermissions = [],
		description = 'No description provided.',
		enabled = true,
		guildOnly = false,
	} : CommandOptions) {
		this.client = client;
		this.name = filename ? filename.split(sep)[filename.split(sep).length - 1].replace('.js', '').toLowerCase(): 'Unkown';
		this.conf = {
			name: this.name,
			enabled,
			botPermissions
		};
		const bitPerms: bigint[] = [];
		memberPermissions.forEach((p: PermissionString) => {
			bitPerms.push(Permissions.FLAGS[p] as bigint);
		});
		const bit = bitPerms.reduce((a, b) => a | b, 0n).toString();
		this.applicationCommandBody = {
			name: this.name,
			type: 1,
			description,
			dm_permission: !guildOnly,
		};
		if (bit !== '0') {
			this.applicationCommandBody['default_member_permissions'] = bit;
		}
	}
	abstract run (interaction: CommandInteraction, data: any) : void;
}