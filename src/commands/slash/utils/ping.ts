import { SlashCommandInfo, SlashCommandRun } from '@/Interfaces';

export const run: SlashCommandRun = async (client, interaction) => {
	interaction.reply({ content: `${client.ws.ping}` });
};

export const info: SlashCommandInfo = {
	name: 'ping',
	description: 'Simple ping command',
	category: 'utils'
};
