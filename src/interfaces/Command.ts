import Client from '@/Client';
import { CommandInteraction } from 'discord.js';

export interface Command {
	info: CommandInfo;
	run: CommandRun;
}

export interface CommandRun {
	(client: Client, interaction: CommandInteraction);
}

export interface CommandInfo {
	name: string;
	description: string;
	category: string;
	options?: Options[];
	dm_permission: boolean;
	default_member_permissions?: number;
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
}

interface Choices {
	name: string;
	value: string;
}
