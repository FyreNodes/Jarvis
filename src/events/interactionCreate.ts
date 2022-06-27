import Client from '@/Client';
import { Interaction } from 'discord.js';
import buttonInteraction from './interactions/buttonInteraction';
import commandInteraction from './interactions/commandInteraction';
import selectMenuInteraction from './interactions/selectMenuInteraction';

export default (client: Client, interaction: Interaction) => {
	if (interaction.isCommand()) return commandInteraction(client, interaction);
	if (interaction.isButton()) return buttonInteraction(client, interaction);
	if (interaction.isSelectMenu()) return selectMenuInteraction(client, interaction);
};
