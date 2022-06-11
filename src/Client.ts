import config from '@config';
import { Client as DiscordClient, Collection, MessageOptions, TextChannel, User } from 'discord.js';
import { Command, BaseCommand, JarvisConfig, Button } from '@/Interfaces';
import { LogChannel, PermissionLevel } from '@/interfaces/Config';
import permission from './database/schemas/permission';

export default class Client extends DiscordClient {
	public commands: Collection<string, Command> = new Collection();
	public buttons: Collection<string, Button> = new Collection();
	public baseCommands: Collection<string, BaseCommand> = new Collection();
	public config: JarvisConfig = config;

	public getPermissionLevel = async (user: User): Promise<PermissionLevel> => {
		if (!await permission.exists({ user: user.id })) return 0;
		const permissionLevel = await permission.findOne({ user: user.id });
		return permissionLevel.level;
	};

	public log = (ch: LogChannel, msg: MessageOptions) => {
		const channel = this.channels.cache.find(Object.keys(this.config.channels.logs)[ch]) as TextChannel;
		channel.send(msg);
	};
};
