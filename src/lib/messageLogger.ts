import Client from '@/Client';
import ticket from '@/database/schemas/ticket';
import messageLog from '@/database/schemas/messageLog';
import { Message } from 'discord.js';

export default async (client: Client, message: Message) => {
	if (!(await ticket.exists({ channel: message.channel.id }))) return;
	await messageLog.create({ guild: message.guild.id, message: message.content, channel: message.channel.id, author: `${message.author.tag} (${message.author.id})`, messageID: message.id });
};
