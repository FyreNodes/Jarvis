import Client from '@/Client';
import { SlashCommand } from '@/Interfaces';
import { readdirSync } from 'fs';

export const slashCommandHandler = async (client: Client) => {
	const path: string = `${__dirname}/../commands/slash`;
	await readdirSync(path).forEach(async (dir: string) => {
		const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts'));
		for (const cmd of commands) {
			const command: SlashCommand = require(`${path}/${dir}/${cmd}`);
			await client.slashCommands.set(command.info.name, command);
		}
	});
};
