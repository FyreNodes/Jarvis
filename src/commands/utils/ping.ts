import { CommandInfo, CommandRun } from '@/Interfaces';
import { MessageEmbed } from 'discord.js';

export const run: CommandRun = (client, message, args) => {
	const appPing = Date.now() - message.createdTimestamp;
	let embed = new MessageEmbed({
		title: '🏓 System Ping',
		color: '#1AB6DC',
		description: `⏳️ App: ${appPing}ms\n💓 WS: ${client.ws.ping}ms\n⚙ Gen: ${(appPing + client.ws.ping) / 2}ms`,
		footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	message.channel.send({ embeds: [embed] });
};

export const info: CommandInfo = {
	name: 'ping',
	category: 'utils',
	permissions: ['MANAGE_MESSAGES']
};
