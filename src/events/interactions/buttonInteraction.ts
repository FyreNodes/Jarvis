import Client from '@/Client';
import { Button } from '@/Interfaces';
import { ButtonInteraction } from 'discord.js';

export default async (client: Client, interaction: ButtonInteraction) => {
	if (!interaction.inGuild) return;
	const int: string = interaction.customId.toString().toLowerCase();
	const button: Button = await client.buttons.get(int);
	if (!button) return;
	button.run(client, interaction);
};
