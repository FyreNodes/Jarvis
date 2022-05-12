import Client from '@/Client';
import { Interaction } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';

export default (client: Client, interaction: CommandInteraction) => {
	const int: string = interaction.commandName.toString().toLowerCase();
	const cmdInteraction: Interaction = client.interactions.get(int);
	if (!cmdInteraction) return;
	cmdInteraction.run(client, interaction);
};
