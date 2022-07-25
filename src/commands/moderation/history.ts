import ticket from '@/database/schemas/ticket';
import { CommandRun, CommandInfo } from '@/Interfaces';
import permissions from '@/lib/permissions';
import getUser from '@/utils/getUser';
import { EmbedBuilder } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const member = await getUser(interaction, interaction.options.getUser('member') || interaction.member);
	const tickets = await ticket.find({ guild: interaction.guild.id, user: member.user.id });
	if (!tickets.length) return await interaction.reply({ content: 'The specified user has no ticket history.' });
	let embed = new EmbedBuilder({
		author: { name: `Ticket History | ${member.user.tag}`, iconURL: member.user.avatarURL() },
		thumbnail: { url: member.user.avatarURL() },
		color: client.config.themeColor,
		description: tickets.map((data) => {return `**ID:** ${data.ticketID} | **Department:** ${data.department.replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General')}`}).join('\n'), // prettier-ignore
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
	name: 'history',
	category: 'moderation',
	description: 'View a members ticket history.',
	default_member_permissions: permissions.moderateMembers,
	dm_permission: false,
	options: [
		{
			type: 6,
			name: 'user',
			description: 'The user whos history you want to view.',
			required: false
		}
	]
};
