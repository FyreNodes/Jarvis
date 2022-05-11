import { Client as DiscordClient, Collection } from 'discord.js';
import { Command, Interaction } from '@/Interfaces';
import { commandHandler, interactionHandler, eventHandler } from '@/Handlers';
import connect from '@/database/connect';

export default class Client extends DiscordClient {
	public commands: Collection<string, Command> = new Collection();
	public interactions: Collection<string, Interaction> = new Collection();

	public init() {
		eventHandler(this);
		commandHandler(this);
		interactionHandler(this);
		connect();
		this.login(process.env.TOKEN);
	}
}
