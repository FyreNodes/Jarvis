import Client from '@/Client';
import { Message, PermissionResolvable } from 'discord.js';
import { GuildLockResolveable, PermissionLevel } from '@/interfaces/Config';

export interface BaseCommand {
	info: BaseCommandInfo;
	run: BaseCommandRun;
}

export interface BaseCommandRun {
	(client: Client, message: Message, args: string[]);
}

export interface BaseCommandInfo {
	name: string;
	category: string;
	permissions?: PermissionResolvable[];
	permissionLevel?: PermissionLevel;
	userWl?: string[];
	guildLock?: GuildLockResolveable;
}
