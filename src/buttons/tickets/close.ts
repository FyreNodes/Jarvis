import ticket from '@/database/schemas/ticket';
import closeTicket from '@/functions/closeTicket';
import { ButtonInfo, ButtonRun } from '@/Interfaces';
import { ButtonInteraction, MessageActionRow, MessageButton } from 'discord.js';

export const run: ButtonRun = async (client, interaction: ButtonInteraction) => {
	if (!(await ticket.exists({ channel: interaction.channel.id }))) return interaction.reply({ content: 'This is not a ticket.', ephemeral: true });
	const closeButton: MessageButton = new MessageButton({ customId: 'btn.ticket.close', label: 'Close', emoji: '🔒', style: 'DANGER', disabled: true });
	const actionRow = new MessageActionRow({ components: [closeButton] });
	await interaction.update({ components: [actionRow] });
	await closeTicket(client, interaction);
};

export const info: ButtonInfo = {
	custom_id: 'btn.ticket.close',
	category: 'tickets'
};
