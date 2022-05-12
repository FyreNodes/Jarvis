import infraction from '@/database/schemas/infraction';
import { CommandInfo, CommandRun } from '@/Interfaces';
import getUser from '@/utils/getUser';
import { MessageEmbed, Permissions } from 'discord.js';

export const run: CommandRun = async (client, message, args) => {
	const member = await getUser(message, message.mentions.users.first() || args[1]);
	switch (args[0]) {
		case 'view':
			let viewInf = await infraction.find({ user: member.id });
			if (!viewInf.length) return message.channel.send({ content: `${member.user.tag} has no infractions.` });
			let viewEmbed = new MessageEmbed({
				author: {
					name: `Infraction's | ${member.user.tag}`,
					iconURL: member.user.avatarURL()
				},
				color: '#1AB6DC',
				description: viewInf
					.map((data) => {
						return `**ID:** ${data.infID} **|** Moderator: ${message.guild.members.cache.get(data.details.moderator).user.tag} **|** Reason: ${data.details.reason} ${data.details.duration ? `**|** Duration: ${data.details.duration}` : ``}`;
					})
					.join('\n'),
				thumbnail: { url: member.user.avatarURL() },
				footer: {
					text: 'Jarvis Moderation',
					iconURL: client.user.avatarURL()
				},
				timestamp: Date.now()
			});
			message.channel.send({ embeds: [viewEmbed] });
			break;

		case 'del':
		case 'delete':
			if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply({ content: 'You do not have permission!' });
			if (!(await infraction.exists({ infID: args[2] }))) return message.reply({ content: 'That infraction does not exist!' });
			await infraction.deleteOne({ infID: args[2] });
			message.channel.send({ content: 'Successfully deleted infraction.' });
			break;

		case 'clear':
			if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: 'You do not have permission!' });
			await infraction.deleteMany({ user: member.id });
			message.channel.send({ content: 'Successfully cleared infractions.' });
			break;

		default:
			message.reply({ content: 'Invalid operation!' });
			break;
	}
};

export const info: CommandInfo = {
	name: 'infraction',
	category: 'moderation',
	permissions: ['MODERATE_MEMBERS']
};
