import Client from '@/Client';
import botConfig from '@/database/schemas/config';
import { Command } from '@/Interfaces';
import { Message } from 'discord.js';

export default async (client: Client, message: Message) => {
	if (message.author.bot || !message.guild) return;
	if (!(await botConfig.exists({ guildID: message.guild.id, botID: client.user.id }))) await botConfig.create({ guildID: message.guild.id, botID: client.user.id, prefix: '.' });
	const cfg = await botConfig.findOne({ guildID: message.guild.id, botID: client.user.id });
	const prefix: string = await cfg.get('prefix');
	if (!message.content.startsWith(prefix)) return;
	const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd: string = args.shift().toLowerCase();
	if (cmd.length == 0) return;
	const command: Command = client.commands.get(cmd);
	if (!command) return;
	if (!command.info.permissions) return await command.run(client, message, args);
	let user_perms = [];
	await command.info.permissions.forEach((perm) => {
		if (message.member.permissions.has(perm, true)) user_perms.push(true);
	});
	if (user_perms.includes(true)) await command.run(client, message, args);
};
