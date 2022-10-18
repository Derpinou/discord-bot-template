import { EventsEmitterTypes, EventsOptions } from '../Types/globals';
import { Bot } from './Bot';

export abstract class BaseEvent {
	emitter: EventsEmitterTypes;
	enabled: boolean;
	protected constructor (protected readonly client: Bot, options?: EventsOptions) {
		this.client = client;
		this.emitter = options?.emitter || EventsEmitterTypes.Client;
	}
	abstract run (...args: unknown[]) : void
}