import Client from '@/Client';
import { Command } from '@/Interfaces';
import { readdirSync } from 'fs';
import { grey, green, white } from 'chalk';

export const commandHandler = async (client: Client) => {
	const path: string = `${__dirname}/../commands`;
	await readdirSync(path).forEach(async (dir: string) => {
		const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('js'));
		for (const cmd of commands) {
			const command: Command = require(`${path}/${dir}/${cmd}`);
			await client.commands.set(command.info.name, command);
		}
	});
	console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All commands have been loaded.')}`);
};
