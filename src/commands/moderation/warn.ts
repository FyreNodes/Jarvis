import { CommandInfo, CommandRun } from '@/Interfaces';
import gen from '@/utils/gen';
import getUser from '@/utils/getUser';
import { MessageEmbed, TextChannel } from 'discord.js';
import infraction from '@/database/schemas/infraction';

export const run: CommandRun = async (client, message, args) => {
	const member = await getUser(message, message.mentions.users.first() || args[0]);
	const reason = message.content.split(/ +/g).slice(2).join(' ');
	const moderator = message.member;
	if (!reason) return message.reply({ content: 'You did not specify a reason!' });
	const infID = await gen('id', 6);
	let userEmbed = new MessageEmbed({
		title: 'You have been warned in FyreNodes.',
		thumbnail: { url: message.guild.iconURL() },
		color: '#FAF333',
		description: `**ID:** ${infID}\n**Reason:** ${reason.replace('-s', '')}\n${message.content.includes('-s') ? '' : `**Moderator:** ${moderator.user.tag} (<@${moderator.id}>)`}`,
		footer: {
			text: 'Moderation • Jarvis',
			iconURL: client.user.avatarURL()
		},
		timestamp: Date.now()
	});
	let logsEmbed = new MessageEmbed({
		author: {
			name: `Infraction | Warn | ${infID}`,
			iconURL: member.user.avatarURL()
		},
		color: '#FAF333',
		fields: [
			{
				name: 'User:',
				value: `${member.user.tag} (<@${member.id}>)`,
				inline: true
			},
			{
				name: 'Moderator:',
				value: `${moderator.user.tag} (<@${moderator.id}>)`,
				inline: true
			},
			{ name: 'Reason:', value: reason, inline: false }
		],
		footer: {
			text: 'Moderation • Jarvis',
			iconURL: client.user.avatarURL()
		},
		timestamp: Date.now()
	});
	await infraction.create({
		infID: infID,
		guild: message.guild.id,
		type: 'Warn',
		user: member.id,
		details: { reason: reason, moderator: moderator.id }
	});
	await member.send({ embeds: [userEmbed] }).catch(() => {});
	await (message.guild.channels.cache.get('968665856919888002') as TextChannel).send({ embeds: [logsEmbed] });
	message.channel.send({ content: `Successfully warned ${member.user.tag}.` });
};

export const info: CommandInfo = {
	name: 'warn',
	category: 'moderation',
	permissions: ['MANAGE_MESSAGES']
};
