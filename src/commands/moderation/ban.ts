import infraction from '@/database/schemas/infraction';
import { CommandInfo, CommandRun } from '@/Interfaces';
import gen from '@/utils/gen';
import getUser from '@/utils/getUser';
import { MessageEmbed, TextChannel } from 'discord.js';

export const run: CommandRun = async (client, message, args) => {
	const member = await getUser(message, message.mentions.users.first() || args[0]);
	if (!(await member.moderatable)) return message.channel.send({ content: 'I can not moderate this user.' });
	const reason = message.content.split(/ +/g).slice(2).join(' ');
	const moderator = message.member;
	if (!reason) return message.reply({ content: 'You did not specify a reason!' });
	const infID = await gen('id', 6);
	let userEmbed = new MessageEmbed({
		title: 'You have been banned from FyreNodes.',
		thumbnail: { url: message.guild.iconURL() },
		color: '#FA2929',
		description: `**ID:** ${infID}\n**Reason:** ${reason.replace('-s', '')}\n${message.content.includes('-s') ? '' : `**Moderator:** ${moderator.user.tag} (<@${moderator.id}>)`}`,
		footer: {
			text: 'Jarvis Moderation',
			iconURL: client.user.avatarURL()
		},
		timestamp: Date.now()
	});
	let logsEmbed = new MessageEmbed({
		author: {
			name: `Infraction | Ban | ${infID}`,
			iconURL: member.user.avatarURL()
		},
		color: '#FA2929',
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
			text: 'Jarvis Moderation',
			iconURL: client.user.avatarURL()
		},
		timestamp: Date.now()
	});
	await infraction.create({
		infID: infID,
		guild: message.guild.id,
		type: 'Ban',
		user: member.id,
		details: { reason: reason, moderator: moderator.id }
	});
	await member.send({ embeds: [userEmbed] }).catch(() => {});
	await member.ban({ days: 3, reason: `Moderator: ${moderator.user.tag}; Reason: ${reason}` });
	await (message.guild.channels.cache.get('968665856919888002') as TextChannel).send({ embeds: [logsEmbed] });
	message.channel.send({ content: `Successfully banned ${member.user.tag}.` });
};

export const info: CommandInfo = {
	name: 'ban',
	category: 'moderation',
	permissions: ['BAN_MEMBERS']
};
