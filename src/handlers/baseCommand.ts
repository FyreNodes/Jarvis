import Client from '@/Client';
import { BaseCommand } from '@/Interfaces';
import { readdirSync } from 'fs';
import { grey, green, white } from 'chalk';

export const baseCommandHandler = async (client: Client) => {
	const path: string = `${__dirname}/../base`;
	await readdirSync(path).forEach(async (dir: string) => {
		const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('js'));
		for (const cmd of commands) {
			const command: BaseCommand = require(`${path}/${dir}/${cmd}`);
			await client.baseCommands.set(command.info.name, command);
		}
	});
	console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All base commands have been loaded.')}`);
};
