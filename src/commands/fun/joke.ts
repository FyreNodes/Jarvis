import { CommandInfo, CommandRun } from '@/Interfaces';
import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const req = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist');
	const category = req.data.category.toString().replace('Misc', 'Random');
	switch (req.data.type) {
		case 'single':
			let sEmbed = new EmbedBuilder({
				title: `${category} Joke`,
				color: client.config.themeColor,
				description: req.data.joke,
				footer: { text: 'Jarvis Fun', iconURL: client.user.avatarURL() },
				timestamp: Date.now()
			});
			await interaction.reply({ embeds: [sEmbed] });
			break;

		case 'twopart':
			let tEmbed = new EmbedBuilder({
				title: `${category} Joke`,
				color: client.config.themeColor,
				description: `${req.data.setup}\n\n${req.data.delivery}`,
				footer: { text: 'Jarvis Fun', iconURL: client.user.avatarURL() },
				timestamp: Date.now()
			});
			await interaction.reply({ embeds: [tEmbed] });
			break;
	}
};

export const info: CommandInfo = {
	name: 'joke',
	category: 'fun',
	description: 'Get a random internet joke',
	dm_permission: true
};
