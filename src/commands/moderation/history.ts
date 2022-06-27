import ticket from '@/database/schemas/ticket';
import { CommandRun, CommandInfo } from '@/Interfaces';
import getUser from '@/utils/getUser';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
	const member = await getUser(interaction, interaction.options.getUser('member') || interaction.member);
	const tickets = await ticket.find({ guild: interaction.guild.id, user: member.user.id });
	if (!tickets.length) return await interaction.reply({ content: 'The specified user has no ticket history.' });
	let embed = new MessageEmbed({
		author: { name: `Ticket History | ${member.user.tag}`, iconURL: member.user.avatarURL() },
		thumbnail: { url: member.user.avatarURL() },
		color: '#1AB6DC',
		description: tickets
			.map((data) => {
				return `**ID:** ${data.ticketID} | **Department:** ${data.department.replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General')}`;
			})
			.join('\n'),
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
	name: 'history',
	category: 'moderation',
	description: 'Display a members ticket history.',
	default_member_permissions: 0x0000000000002000,
	dm_permission: false,
	options: [
		{
			type: 6,
			name: 'member',
			description: 'The member whos history you would like to view.',
			required: false
		}
	]
};
