import Client from '@/Client';
import { CommandInteraction } from 'discord.js';

export interface SlashCommand {
	info: SlashCommandInfo;
	run: SlashCommandRun;
}

export interface SlashCommandRun {
	(client: Client, interaction: CommandInteraction);
}

export interface SlashCommandInfo {
	name: string;
	description: string;
	category: string;
	type?: number;
	options?: {
		type?: number;
		name: string;
		description: string;
		required?: boolean;
		choices?: string[];
		autocomplete?: boolean;
	};
	default_permission?: boolean;
}
