import { ClientOptions } from 'discord.js';

export interface Config extends ClientOptions {
    deployCommands: boolean
}