import Client from '@/Client';
import { Interaction } from 'discord.js';
import buttonInteraction from './interactions/buttonInteraction';
import commandInteraction from './interactions/commandInteraction';

export default (client: Client, interaction: Interaction) => {
	if (!interaction.inGuild) return;
	if (interaction.isCommand()) return commandInteraction(client, interaction);
	if (interaction.isButton()) return buttonInteraction(client, interaction);
};
