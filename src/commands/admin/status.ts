import { CommandRun, CommandInfo } from '@/Interfaces';
import config from '@/database/schemas/config';
import { ExcludeEnum, PresenceStatusData, ReactionUserManager } from 'discord.js';
import { ActivityTypes } from 'discord.js/typings/enums';

export const run: CommandRun = async (client, message, args) => {
	if (!args[0]) return message.reply({ content: 'You did not specify the status type!' });
	if (!args[1]) return message.reply({ content: 'You did not specify the activity type!' });
	if (!args[2]) return message.reply({ content: 'You did not specify the activity name/url!' });
	if (!['online', 'idle', 'dnd', 'invisible'].includes(args[0].toLowerCase())) return message.reply({ content: 'Invalid status type specified!' });
	if (!['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING'].includes(args[1].toUpperCase())) return message.reply({ content: 'Invalid activity type specified!' });
	const statusType = args[0] as PresenceStatusData;
	const activityType = args[1] as ExcludeEnum<typeof ActivityTypes, "CUSTOM">
	const activityName: string = args[1] === 'STREAMING' ? message.content.split(' ').slice(4).join(' ') : message.content.split(' ').slice(3).join(' ');
	client.user.setPresence({ status: statusType, activities: [{ type: activityType, name: activityName, url: args[1] === 'STREAMING' ? args[2] : undefined }] });
	await config.updateOne({ guildID: message.guild.id }, { status: { type: statusType, activity: { type: activityType ,name: activityName, url: args[1] === 'STREAMING' ? args[2] : undefined } } });
	message.channel.send({ content: `Successfully updated status for ${client.user.username}` });
};

export const info: CommandInfo = {
	name: 'status',
	category: 'admin',
	permissions: ['ADMINISTRATOR']
};
