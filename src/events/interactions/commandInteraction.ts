import Client from '@/Client';
import { Command } from '@/Interfaces';
import { ChatInputCommandInteraction } from 'discord.js';

export default async (client: Client, interaction: ChatInputCommandInteraction) => {
	const int: string = interaction.commandName.toString().toLowerCase();
	const cmd: Command = client.commands.get(int);
	if (!cmd) return;
	const disabled = client.disabled.get(cmd.info.name);
	if (disabled) return await interaction.reply({ content: 'This command is currently disabled.' });
	return cmd.run(client, interaction);
};
