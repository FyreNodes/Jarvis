import config from '@config';
import { Client as DiscordClient, Collection, MessageOptions, TextChannel, User } from 'discord.js';
import { Command, BaseCommand, JarvisConfig, Button } from '@/Interfaces';
import { LogChannel, PermissionLevel } from '@/interfaces/Config';
import permission from '@/database/schemas/permission';
import { red, cyan, white, yellow, grey, bold } from 'chalk';

export default class Client extends DiscordClient {
	public disabled: Collection<string, boolean> = new Collection();
	public commands: Collection<string, Command> = new Collection();
	public buttons: Collection<string, Button> = new Collection();
	public baseCommands: Collection<string, BaseCommand> = new Collection();
	public config: JarvisConfig = config;

	public getPermissionLevel = async (user: User): Promise<PermissionLevel> => {
		if (!(await permission.exists({ user: user.id }))) return 0;
		const permissionLevel = await permission.findOne({ user: user.id });
		return permissionLevel.level;
	};

	public log = (ch: LogChannel, msg: MessageOptions) => {
		const channel = this.channels.cache.get(this.config.channels.logs[ch]) as TextChannel;
		channel.send(msg);
	};

	public out = (level: 'error'|'warn'|'info'|'debug', msg: string): string => {
		let log = '';
		switch (level) {
			case 'error':
				log = `${grey.bold('[')}${red.bold('ERROR')}${grey.bold(']')} ${white(msg)}`;
			break;

			case 'warn':
				log = `${grey.bold('[')}${yellow.bold('WARN')}${grey.bold(']')} ${white(msg)}`;
			break;

			case 'info':
				log = `${grey.bold('[')}${cyan.bold('INFO')}${grey.bold(']')} ${white(msg)}`;
			break;

			case 'debug':
				log = `${grey.bold('[')}${white.bold('DEBUG')}${grey.bold(']')} ${white(msg)}`;
			break;
		};

		console.log(log);
		return log;
	};
}
