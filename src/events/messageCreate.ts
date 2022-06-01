import Client from '@/Client';
import { BaseCommand, Command } from '@/Interfaces';
import messageLogger from '@/lib/messageLogger';
import { Message } from 'discord.js';

export default async (client: Client, message: Message) => {
	if (message.author.bot || !message.guild) return;
	await messageLogger(client, message);
	if (!message.content.startsWith(process.env.PREFIX)) return;
	const args: string[] = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const cmd: string = args.shift().toLowerCase();
	if (cmd.length == 0) return;
	const command: BaseCommand = client.baseCommands.get(cmd);
	if (!command) return;
	if (!command.info.permissions) return command.run(client, message, args);
	let user_perms: boolean[] = [];
	command.info.permissions.forEach((perm) => {
		if (message.member.permissions.has(perm, true)) user_perms.push(true);
	});
	if (!user_perms.includes(true)) return message.reply('You do not have permission!');
	command.run(client, message, args);
};
