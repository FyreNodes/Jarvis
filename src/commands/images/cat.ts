import { CommandInfo, CommandRun } from '@/Interfaces';
import axios from 'axios';
import { AttachmentBuilder } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const image = await axios.get('https://api.thecatapi.com/v1/images/search', {
		headers: {
			'X-API-KEY': process.env.CAT_API
		}
	});
	const attachment = new AttachmentBuilder(image.data[0].url, { name: 'cat.jpg' });
	await interaction.reply({ files: [attachment] });
};

export const info: CommandInfo = {
	name: 'cat',
	category: 'images',
	description: 'Posts a random cat picture',
	dm_permission: true
};
