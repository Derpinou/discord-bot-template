import {Bot} from './Bot';

export abstract class BaseEvent {
	protected constructor (protected readonly client: Bot) {
		this.client = client;
	}
	abstract run (...args: any[]) : void
}