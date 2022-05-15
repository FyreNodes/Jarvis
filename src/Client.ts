import { Client as DiscordClient, Collection } from 'discord.js';
import { Command, Interaction } from '@/Interfaces';
import { commandHandler, interactionHandler, eventHandler } from '@/Handlers';
import connect from '@/database/connect';
import transcripts from '@/helpers/transcripts';
import database from './helpers/database';

export default class Client extends DiscordClient {
	public commands: Collection<string, Command> = new Collection();
	public interactions: Collection<string, Interaction> = new Collection();

	public async init() {
		await transcripts();
		eventHandler(this);
		commandHandler(this);
		interactionHandler(this);
		await database();
		connect();
		this.login(process.env.TOKEN);
	}
}
