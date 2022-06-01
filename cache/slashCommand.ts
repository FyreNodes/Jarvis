/*import Client from '@/Client';
import { Interaction } from '@/Interfaces';
import { readdirSync } from 'fs';

export const commandInteraction = async (client: Client) => {
	const path: string = `${__dirname}/../interactions/commands`;
	await readdirSync(path).forEach(async (dir: string) => {
		const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
		for (const cmd of commands) {
			const command: Interaction = require(`${path}/${dir}/${cmd}`);
			await client.interactions.set(command.info.name, command);
		}
	});
};*/