import { CommandInfo, CommandRun } from '@/Interfaces';
import axios from 'axios';
import { MessageAttachment } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const image = await axios.get('https://api.thecatapi.com/v1/images/search', {
		headers: {
			'X-API-KEY': process.env.CAT_API_KEY
		}
	});
	const attachment = new MessageAttachment(image.data[0].url, 'cat.jpg');
	await interaction.reply({ files: [attachment] });
};

export const info: CommandInfo = {
	name: 'cat',
	category: 'images',
	description: 'Posts a random cat picture',
	dm_permission: true
};
