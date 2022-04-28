import Client from '@/Client';
import { Message, PermissionFlags, PermissionResolvable, Permissions } from 'discord.js';

export interface Command {
	info: CommandInfo;
	run: CommandRun;
}

export interface CommandRun {
	(client: Client, message: Message, args: string[]);
}

export interface CommandInfo {
	name: string;
	category: string;
	permissions?: PermissionResolvable[];
}
