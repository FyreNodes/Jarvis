import Client from '@/Client';
import { Command } from '@/Interfaces';
import { readdirSync } from 'node:fs';
import { grey, green, white } from 'chalk';

export default async (client: Client) => {
	const path: string = `${__dirname}/../commands`;
	await readdirSync(path).forEach(async (dir: string) => {
		const commands: string[] = await readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
		for (let command of commands) {
			const cmd: Command = require(`${path}/${dir}/${command}`);
			await client.commands.set(cmd.info.name, cmd);
		}
	});
	console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All commands have been loaded.')}`);
};
