import { CommandInfo, CommandRun } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';
import closeTicket from '@/functions/closeTicket';

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
	await closeTicket(client, interaction);
};

export const info: CommandInfo = {
	name: 'close',
	category: 'tickets',
	description: 'Close a support ticket.',
	dm_permission: false
};
