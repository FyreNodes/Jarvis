import { CommandInfo, CommandRun } from '@/Interfaces';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	let result = '';
	let rating = 'pg13';
	const truthordare = Math.floor(Math.random() * 2) + 1;
	if (interaction.options.getString('rating')) rating = interaction.options.getString('rating');
	switch (truthordare) {
		case 1:
			result = 'truth';
			break;
		case 2:
			result = 'dare';
			break;
	}
	const req = await axios.get(`https://api.truthordarebot.xyz/v1/${result}?rating=${rating}`);
	let embed = new MessageEmbed({
		title: result.replace('truth', 'Truth').replace('dare', 'Dare'),
		color: client.config.themeColor,
		description: req.data.question,
		footer: { text: 'Jarvis Fun', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
	name: 'truthordare',
	category: 'fun',
	description: 'Play truth or dare with your friends',
	dm_permission: true,
	options: [
		{
			type: 3,
			name: 'rating',
			description: 'The maturity rating of the truth or dare',
			choices: [
				{ name: 'PG', value: 'pg' },
				{ name: 'PG-13', value: 'pg13' },
				{ name: 'R', value: 'r' }
			]
		}
	]
};
