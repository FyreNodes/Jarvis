import { CommandInfo, CommandRun } from '@/Interfaces';
import { CommandInteraction, EmbedBuilder } from 'discord.js';

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
	const appPing = Date.now() - interaction.createdTimestamp;
	let embed = new EmbedBuilder({
		title: '🏓 System Ping',
		color: client.config.themeColor,
		description: `⏳️ App: ${appPing}ms\n💓 WS: ${client.ws.ping}ms\n⚙ Gen: ${(appPing + client.ws.ping) / 2}ms`,
		footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
	name: 'ping',
	category: 'utility',
	description: 'Shows the bots current ping.',
	dm_permission: true
};
