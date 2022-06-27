import infraction from '@/database/schemas/infraction';
import { CommandInfo, CommandRun } from '@/Interfaces';
import gen from '@/utils/gen';
import { CommandInteraction, MessageEmbed, User } from 'discord.js';

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
	const infID: number = await gen('id', 6);
	const user: User = interaction.options.getUser('user');
	const reason: string = interaction.options.getString('reason');
	let userEmbed = new MessageEmbed({
		title: 'You have been warned in FyreNodes.',
		thumbnail: { url: interaction.guild.iconURL() },
		color: '#FAF333',
		description: `**ID:** ${infID}\n**Reason:** ${reason}\n${interaction.options.getBoolean('anonymous') ? '' : `**Moderator:** ${interaction.user.tag} (<@${interaction.user.id}>)`}`,
		footer: { text: 'Jarvis Moderation', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	let logsEmbed = new MessageEmbed({
		author: { name: `Infraction | Warn | ${infID}`, iconURL: user.avatarURL() },
		color: '#FAF333',
		fields: [
			{
				name: 'User:',
				value: `${user.tag} (${user.id})`,
				inline: true
			},
			{
				name: 'Moderator:',
				value: `${interaction.user.tag} (<@${interaction.user.id}>)`,
				inline: true
			},
			{ name: 'Reason:', value: reason, inline: false }
		],
		footer: { text: 'Jarvis Moderation', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await infraction.create({ infID: infID, guild: interaction.guild.id, type: 'Warn', user: user.id, details: { reason: reason, moderator: interaction.user.id } });
	await user.send({ embeds: [userEmbed] }).catch(() => {});
	client.log('moderation', { embeds: [logsEmbed] });
	await interaction.reply({ content: `Successfully warned ${user.tag}.` });
};

export const info: CommandInfo = {
	name: 'warn',
	category: 'moderation',
	description: 'Warns a member.',
	default_member_permissions: Number(1 << 13),
	dm_permission: false,
	options: [
		{
			type: 6,
			name: 'user',
			description: 'User to perform the action on.',
			required: true
		},
		{
			type: 3,
			name: 'reason',
			description: 'Reason for the warning.',
			required: true
		},
		{
			type: 5,
			name: 'anonymous',
			description: 'Show the user your username?',
			required: false
		}
	]
};
