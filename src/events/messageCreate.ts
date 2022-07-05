import Client from '@/Client';
import { BaseCommand, Command } from '@/Interfaces';
import messageLogger from '@/lib/messageLogger';
import contentValidator from '@/lib/contentValidator';
import { Message } from 'discord.js';

export default async (client: Client, message: Message) => {
	if (message.author.bot || !message.guild) return;
	await messageLogger(client, message);
	await contentValidator(client, message);
	if (!message.content.startsWith(process.env.BOT_PREFIX)) return;
	const args: string[] = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/g);
	const cmd: string = args.shift().toLowerCase();
	if (cmd.length == 0) return;
	const command: BaseCommand = client.baseCommands.get(cmd);
	if (!command) return;
	if (command.info.guildLock) {
		switch (command.info.guildLock) {
			case 'main':
				if (message.guild.id !== client.config.guild) return message.reply({ content: 'This command is not supported in this guild.' });
				break;

			case 'staff':
				if (message.guild.id !== client.config.staffGuild) return;
				break;

			default:
				return message.reply({ content: 'This command has not been properly configured by the developer.' });
		}
	}
	if (command.info.userWl) if (!command.info.userWl.includes(message.author.id)) return message.reply({ content: 'You do not have permission to use this command.' });
	if (command.info.permissions) {
		let user_perms: boolean[] = [];
		command.info.permissions.forEach((perm) => {
			if (message.member.permissions.has(perm, true)) user_perms.push(true);
		});
		if (!user_perms.includes(true)) return message.reply({ content: 'You do not have permission!' });
	}
	if (command.info.permissionLevel) {
		if ((await client.getPermissionLevel(message.author)) < command.info.permissionLevel) return message.reply({ content: 'You do not have permission!' });
	}
	return command.run(client, message, args);
};
