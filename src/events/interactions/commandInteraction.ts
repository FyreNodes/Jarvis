import Client from '@/Client';
import { Command } from '@/Interfaces';
import { ChatInputCommandInteraction } from 'discord.js';

export default (client: Client, interaction: ChatInputCommandInteraction) => {
	const int: string = interaction.commandName.toString().toLowerCase();
	const cmd: Command = client.commands.get(int);
	if (!cmd) return;
	cmd.run(client, interaction);
};
