import infraction from '@/database/schemas/infraction';
import { CommandInfo, CommandRun } from '@/Interfaces';
import permissions from '@/lib/permissions';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const user = interaction.options.getUser('user');
	if (!(await infraction.exists({ user: user.id }))) return await interaction.reply({ content: `${user.tag} has no infractions.` });
	switch (interaction.options.getSubcommand()) {
		case 'view':
			let vInf = await infraction.find({ user: user.id });
			let vEmbed = new EmbedBuilder({
				author: { name: `Infraction's - ${user.tag}`, iconURL: user.avatarURL() },
				color: client.config.themeColor,
				description: vInf.map((data) => {return `**ID:** ${data.infID} | **Moderator:** ${interaction.guild.members.cache.get(data.details.moderator).user.tag} | **Reason:** ${data.details.reason} ${data.details.duration ? `| **Duration:** ${data.details.duration}` : ``}`}).join('\n'), // prettier-ignore
				thumbnail: { url: user.avatarURL() },
				footer: { text: 'Jarvis Moderation', iconURL: client.user.avatarURL() },
				timestamp: Date.now()
			});
			await interaction.reply({ embeds: [vEmbed] });
			break;

		case 'delete':
			if (!(interaction.member.permissions as Readonly<PermissionsBitField>).has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({ content: 'You do not have permission!' });
			let dInf = interaction.options.getString('id');
			await infraction.deleteOne({ user: user.id, infID: dInf });
			await interaction.reply({ content: 'Successfully deleted infraction.' });
			break;

		case 'clear':
			if (!(interaction.member.permissions as Readonly<PermissionsBitField>).has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({ content: 'You do not have permission!' });
			await infraction.deleteMany({ user: user.id });
			await interaction.reply({ content: 'Successfully deleted infractions.' });
			break;
	}
};

export const info: CommandInfo = {
	name: 'infraction',
	category: 'moderation',
	description: 'Manage a users infractions.',
	dm_permission: false,
	default_member_permissions: permissions.moderateMembers,
	options: [
		{
			type: 1,
			name: 'view',
			description: 'View a users infractions.',
			options: [
				{
					type: 6,
					name: 'user',
					description: 'User whos infractions you want to view.',
					required: true
				}
			]
		},
		{
			type: 1,
			name: 'delete',
			description: 'Delete an infraction.',
			options: [
				{
					type: 6,
					name: 'user',
					description: 'User whos infraction you want to delete.',
					required: true
				},
				{
					type: 3,
					name: 'id',
					description: 'ID of the infraction you wish to delete.',
					required: true
				}
			]
		},
		{
			type: 1,
			name: 'clear',
			description: 'Clear a users infractions.',
			options: [
				{
					type: 6,
					name: 'user',
					description: 'User who you want to clear.',
					required: true
				}
			]
		}
	]
};
