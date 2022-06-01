import Client from '@/Client';
import { Command } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';

export default (client: Client, interaction: CommandInteraction) => {
	const int: string = interaction.commandName.toString().toLowerCase();
	const cmdInteraction: Command = client.commands.get(int);
	if (!cmdInteraction) return;
	cmdInteraction.run(client, interaction);
};
