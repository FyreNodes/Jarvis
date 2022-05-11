import Client from '@/Client';
import { Interaction } from 'discord.js';
import commandInteraction from './interactions/commandInteraction';

export default (client: Client, interaction: Interaction) => {
	if (interaction.isCommand()) return commandInteraction(client, interaction);
	if (interaction.isButton()) return console.log(`button pressed ${interaction.customId}`);
};
