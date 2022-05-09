import { SlashCommandInfo, SlashCommandRun } from '@/Interfaces';
import { MessageEmbed } from 'discord.js';

export const run: SlashCommandRun = async (client, interaction) => {
	const appPing = Date.now() - interaction.createdTimestamp;
	let embed = new MessageEmbed({
		title: 'System Ping',
		color: '#1AB6DC',
		description: `⏳️ App: ${appPing}ms\n💓 WS: ${client.ws.ping}ms\n⚙ Gen: ${(appPing + client.ws.ping) / 2}ms`,
		footer: {text: 'Jarvis • Utility', iconURL: client.user.avatarURL()},
		timestamp: Date.now()
	});
	interaction.reply({ embeds: [embed] });
};

export const info: SlashCommandInfo = {
	name: 'ping',
	description: 'Shows the bots current ping.',
	category: 'utils'
};
