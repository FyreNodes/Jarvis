import { CommandInfo, CommandRun } from '@/Interfaces';
import axios from 'axios';
import { AttachmentBuilder } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	const image = await axios.get('https://api.thedogapi.com/v1/images/search', {
		headers: {
			'X-API-KEY': process.env.DOG_API_KEY
		}
	});
	const attachment = new AttachmentBuilder(image.data[0].url, { name: 'dog.jpg' });
	await interaction.reply({ files: [attachment] });
};

export const info: CommandInfo = {
	name: 'dog',
	category: 'images',
	description: 'Posts a random dog picture',
	dm_permission: true
};
