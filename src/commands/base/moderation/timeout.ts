import infraction from '@/database/schemas/infraction';
import { CommandInfo, CommandRun } from '@/Interfaces';
import gen from '@/utils/gen';
import getUser from '@/utils/getUser';
import { MessageEmbed, TextChannel } from 'discord.js';
import ms from 'ms';

export const run: CommandRun = async (client, message, args) => {
	const member = await getUser(message, message.mentions.users.first() || args[0]);
	if (!(await member.moderatable)) return message.channel.send({ content: 'I can not moderate this user.' });
	const reason = message.content.split(/ +/g).slice(3).join(' ');
	const moderator = message.member;
	const time = args[1];
	if (!reason) return message.reply({ content: 'You did not specify a reason!' });
	const infID = await gen('id', 6);
	let userEmbed = new MessageEmbed({
		title: 'You have been timed-out in FyreNodes.',
		thumbnail: { url: message.guild.iconURL() },
		color: '#FA8A29',
		description: `**ID:** ${infID}\n**Reason:** ${reason.replace('-s', '')}\n**Duration:** ${ms(ms(time), {
			long: true
		})}\n${message.content.includes('-s') ? '' : `**Moderator:** ${moderator.user.tag} (<@${moderator.id}>)`}`,
		footer: { text: 'Moderation • Jarvis', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	let logsEmbed = new MessageEmbed({
		author: { name: `Infraction | Timeout | ${infID}`, iconURL: member.user.avatarURL() },
		color: '#FA8A29',
		fields: [
			{ name: 'User:', value: `${member.user.tag} (<@${member.id}>)`, inline: true },
			{ name: 'Moderator:', value: `${moderator.user.tag} (<@${moderator.id}>)`, inline: true },
			{ name: 'Duration:', value: ms(ms(time), { long: true }), inline: true },
			{ name: 'Reason:', value: reason, inline: false }
		],
		footer: { text: 'Moderation • Jarvis', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await member.timeout(ms(time), `Moderator: ${moderator.user.tag}; Reason: ${reason}`);
	await infraction.create({
		infID: infID,
		guild: message.guild.id,
		type: 'Timeout',
		user: member.id,
		details: { reason: reason, moderator: moderator.id, duration: ms(ms(time), { long: true }) }
	});
	await member.send({ embeds: [userEmbed] }).catch(() => {});
	await (message.guild.channels.cache.get('968665856919888002') as TextChannel).send({ embeds: [logsEmbed] });
	message.channel.send({ content: `Successfully timed-out ${member.user.tag} for ${ms(ms(time), { long: true })}.` });
};

export const info: CommandInfo = {
	name: 'timeout',
	category: 'moderation',
	permissions: ['MODERATE_MEMBERS']
};
