import Client from '@/Client';
import { Command } from '@/Interfaces';
import { CommandInteraction } from 'discord.js';

export default (client: Client, interaction: CommandInteraction) => {
	const int: string = interaction.commandName.toString().toLowerCase();
	const cmd: Command = client.commands.get(int);
	if (!cmd) return;
	cmd.run(client, interaction);
};
