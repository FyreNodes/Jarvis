import Client from '@/Client';
import { CommandInteraction } from 'discord.js';

export interface Interaction {
	info: InteractionInfo;
	run: InteractionRun;
}

export interface InteractionRun {
	(client: Client, interaction: CommandInteraction);
}

export interface InteractionInfo {
	name: string;
	description: string;
	category: string;
	intType: 'command' | 'button' | 'submit';
	type?: number;
	options?: Options[];
	default_permission?: boolean;
}

interface Options {
	type?: number;
	name: string;
	description: string;
	required?: boolean;
	autocomplete?: boolean;
	choices?: Choices[];
}

interface Choices {
	name: string;
	value: string;
}