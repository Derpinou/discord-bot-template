import { Bot } from '../../Classes/Bot';
import { BaseEvent } from '../../Classes/Event';
import { EventsEmitterTypes } from '../../Types/globals';

export default class UncaughtException extends BaseEvent {
	constructor (client: Bot) {
		super(client, {
			emitter: EventsEmitterTypes.Process,
		});
	}

	run (err: Error, origin: string): void {
		console.log('New unhandledRejection: ', err, origin);
	}
}