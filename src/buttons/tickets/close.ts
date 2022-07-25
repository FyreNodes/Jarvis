import ticket from '@/database/schemas/ticket';
import closeTicket from '@/functions/closeTicket';
import { ButtonInfo, ButtonRun } from '@/Interfaces';
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';

export const run: ButtonRun = async (client, interaction: ButtonInteraction) => {
	if (!(await ticket.exists({ channel: interaction.channel.id }))) return interaction.reply({ content: 'This is not a ticket.', ephemeral: true });
	const closeButton = new ButtonBuilder({ customId: 'btn.ticket.close', label: 'Close', emoji: '🔒', style: ButtonStyle.Danger, disabled: true });
	const actionRow = new ActionRowBuilder<ButtonBuilder>({ components: [closeButton] });
	await interaction.update({ components: [actionRow] });
	await closeTicket(client, interaction);
};

export const info: ButtonInfo = {
	custom_id: 'btn.ticket.close',
	category: 'tickets'
};
