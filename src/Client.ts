import config, { JarvisConfig } from '@config';
import { Client as DiscordClient, Collection, User } from 'discord.js';
import { Command, Interaction } from '@/Interfaces';
import { commandHandler, interactionHandler, eventHandler } from '@/Handlers';
import connect from '@/database/connect';
import transcripts from '@/helpers/transcripts';
import database from './helpers/database';
import dayjs from './helpers/modules/dayjs';

export default class Client extends DiscordClient {
	public commands: Collection<string, Command> = new Collection();
	public interactions: Collection<string, Interaction> = new Collection();
	public config: JarvisConfig = config;

	public async init() {
		await transcripts();
		eventHandler(this);
		commandHandler(this);
		interactionHandler(this);
		await database();
		dayjs();
		connect();
		this.login(process.env.TOKEN);
	};

	public isDeveloper(user: User): boolean {
		if (config.developers.includes(user.id)) return true; else return false;
	};
}
