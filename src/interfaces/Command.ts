import Client from '@/Client';
import { ChatInputCommandInteraction } from 'discord.js';
import { GuildLockResolveable } from '@/interfaces/Config';

export interface Command {
	info: CommandInfo;
	run: CommandRun;
}

export interface CommandRun {
	(client: Client, interaction: ChatInputCommandInteraction);
}

export interface CommandInfo {
	name: string;
	description: string;
	category: string;
	options?: Options[];
	dm_permission: boolean;
	default_member_permissions?: number;
	guildLock?: GuildLockResolveable;
}

interface Options {
	type?: number;
	name: string;
	description: string;
	required?: boolean;
	min_value?: number;
	max_value?: number;
	autocomplete?: boolean;
	choices?: Choices[];
	options?: Options[];
}

interface Choices {
	name: string;
	value: string;
}
