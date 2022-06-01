import config from '@config';
import { Client as DiscordClient, Collection, MessageOptions, TextChannel, User } from 'discord.js';
import { Command, BaseCommand, JarvisConfig, Button } from '@/Interfaces';
import { LogChannel, PermissionLevel } from '@/interfaces/Config';

export default class Client extends DiscordClient {
	public commands: Collection<string, Command> = new Collection();
	public buttons: Collection<string, Button> = new Collection();
	public baseCommands: Collection<string, BaseCommand> = new Collection();
	public config: JarvisConfig = config;

	public getPermissionLevel = (user: User): PermissionLevel => {
		if (!this.config.perms.includes({ id: user.id })) return 0;
		return this.config.perms.find((x) => x.id === user.id).level;
	};

	public log = (ch: LogChannel, msg: MessageOptions) => {
		const channel = this.channels.cache.find(Object.keys(this.config.channels.logs)[ch]) as TextChannel;
		channel.send(msg);
	};
};
