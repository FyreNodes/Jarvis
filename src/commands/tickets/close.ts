import { CommandInfo, CommandRun } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';
import closeTicket from '@/functions/closeTicket';
import ticket from '@/database/schemas/ticket';

export const run: CommandRun = async (client, interaction) => {
	if (!(await ticket.exists({ channel: interaction.channel.id }))) return interaction.reply({ content: 'This is not a ticket.', ephemeral: true });
	await interaction.deferReply();
	await closeTicket(client, interaction);
};

export const info: CommandInfo = {
	name: 'close',
	category: 'tickets',
	description: 'Close a support ticket.',
	dm_permission: false
};
