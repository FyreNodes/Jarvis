import Client from '@/Client';

export interface Interaction {
	info: InteractionInfo;
	run: InteractionRun;
}

export interface InteractionRun {
	(client: Client, interaction);
}

export interface InteractionInfo {
	name: string;
	description: string;
	category: string;
	intType: 'command' | 'button' | 'submit';
	type?: number;
	options?: Options[];
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
