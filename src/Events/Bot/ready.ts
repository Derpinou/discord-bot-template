import { Bot } from '../../Classes/Bot';
import { BaseEvent } from '../../Classes/Event';

export default class Ready extends BaseEvent {
	constructor (client: Bot) {
		super(client);
	}

	run (): void {
		console.log(`${this.client.user?.tag} is ready!`);
	}
}