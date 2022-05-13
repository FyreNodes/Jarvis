import Client from '@/Client';
import { Interaction } from '@/Interfaces';
import { ButtonInteraction } from 'discord.js';

export default async (client: Client, interaction: ButtonInteraction) => {
	const int: string = interaction.customId.toString().toLowerCase();
	const buttonInteraction: Interaction = await client.interactions.get(int);
	if (!buttonInteraction) return;
	buttonInteraction.run(client, interaction);
};
