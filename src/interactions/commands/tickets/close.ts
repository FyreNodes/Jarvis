import ticket from '@/database/schemas/ticket';
import messageLog from '@/database/schemas/messageLog';
import { InteractionInfo, InteractionRun } from '@/Interfaces';
import { MessageLogInterface } from '@/interfaces/schemas/MessageLog';
import { ButtonInteraction, CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { writeFileSync } from 'fs';
import transcript from '@/database/schemas/transcript';
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
