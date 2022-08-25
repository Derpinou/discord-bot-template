import { ApplicationCommandOption, PermissionsString } from 'discord.js';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

export type BotHandlerType = 'Commands' | 'Events';

export interface CommandOptions {
    filename: string
    description: string
    memberPermissions?: PermissionsString[]
    botPermissions?: PermissionsString[]
    enabled?: boolean
    options?: ApplicationCommandOption[]
    guildOnly?: boolean
}

export interface CommandConf {
    name: string
    enabled: boolean
    botPermissions: PermissionsString[]
}

export type ExtendedRESTPostAPIApplicationCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody & {
    default_member_permissions?: string
    dm_permission?: boolean
}