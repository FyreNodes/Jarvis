import Client from '@/Client';
import { Interaction } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';

export default (client: Client, interaction: CommandInteraction) => {
	const cmd: string = interaction.commandName.toString().toLowerCase();
	const command: Interaction = client.interactions.get(cmd);
	if (!command) return;
	command.run(client, interaction);
};
