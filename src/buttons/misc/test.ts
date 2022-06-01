import { InteractionInfo, InteractionRun } from '@/Interfaces';
import { ButtonInteraction } from 'discord.js';

export const run: InteractionRun = async (client, interaction: ButtonInteraction) => {
	interaction.deferUpdate();
};

export const info: InteractionInfo = {
	name: 'button:test',
	category: 'misc',
	description: 'Testing button.',
	intType: 'button'
};
