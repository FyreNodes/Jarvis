import { CommandInfo, CommandRun } from '@/Interfaces';
import { TextChannel } from 'discord.js';
import ms from 'ms';

export const run: CommandRun = async (client, message, args) => {
	if (isNaN(parseInt(args[0])) || parseInt(args[0]) > 100 || parseInt(args[0]) < 1)
		return message.reply({ content: 'Please specify an amout between 1-100.' });
	const messages = await message.channel.messages.fetch({ limit: parseInt(args[0]) });
	const usable = messages.filter((m) => m.createdTimestamp - Date.now() < ms('14d') && !m.pinned);
	await (message.channel as TextChannel).bulkDelete(usable);
	message.channel.send({ content: 'Successfully deleted messages.' }).then(async (msg) => {
		setTimeout(async () => {
			await msg.delete();
		}, 3000);
	});
};

export const info: CommandInfo = {
	name: 'clear',
	category: 'moderation',
	permissions: ['MANAGE_CHANNELS']
};
