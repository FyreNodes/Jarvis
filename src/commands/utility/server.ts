import { CommandInfo, CommandRun } from '@/Interfaces';
import dayjs from 'dayjs';
import { ChannelType, EmbedBuilder } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const guild = interaction.guild;
	const embed = new EmbedBuilder({
		author: { name: `Server Info - ${guild.name}`, iconURL: guild.iconURL() },
		thumbnail: { url: guild.iconURL() },
		color: client.config.themeColor,
		fields: [
			{ name: 'ID:', value: guild.id, inline: true },
			{ name: 'Owner:', value: `${(await guild.fetchOwner()).user.tag} (<@!${guild.ownerId}>)`, inline: true },
			{ name: 'Members:', value: guild.memberCount.toString(), inline: true },
			{ name: 'Total Channels:', value: guild.channels.cache.size.toString(), inline: true },
			{ name: 'Text Channels:', value: guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildText).size.toString(), inline: true },
			{ name: 'Voice Channels:', value: guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildVoice).size.toString(), inline: true },
			{ name: 'Roles:', value: guild.roles.cache.size.toString(), inline: true },
			{ name: 'Categories:', value: guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildCategory).size.toString(), inline: true },
			{ name: 'Threads:', value: guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildPublicThread).size.toString(), inline: true },
			{ name: 'Created At:', value: `${dayjs(guild.createdTimestamp).tz('America/New_York').format('dddd, MMMM Do, YYYY h:mm A (DD/MM/YYYY)')} (EST/EDT)`, inline: false }
		],
		footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
	name: 'server',
	category: 'utility',
	description: 'Get the current servers information.',
	dm_permission: false
};
