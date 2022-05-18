import { InteractionInfo, InteractionRun } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';
import closeTicket from '@/functions/closeTicket';

export const run: InteractionRun = async (client, interaction: CommandInteraction) => {
	await closeTicket(client, interaction);
};

export const info: InteractionInfo = {
	name: 'close',
	category: 'tickets',
	description: 'Close a support ticket.',
	intType: 'command',
	type: 1
};
