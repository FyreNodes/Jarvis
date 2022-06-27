import { CommandInfo, CommandRun } from '@/Interfaces';
import axios from 'axios';

export const run: CommandRun = async (client, interaction) => {
	const req = await axios.get('https://zenquotes.io/api/quotes/');
	await interaction.reply({ content: `\"${req.data[0].q}\" - ${req.data[0].a}` });
};

export const info: CommandInfo = {
	name: 'quote',
	category: 'fun',
	description: 'Get a random quote',
	dm_permission: true
};
