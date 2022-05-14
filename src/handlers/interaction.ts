import Client from '@/Client';
import { Interaction } from '@/Interfaces';
import { readdirSync } from 'fs';
import { grey, green, white } from 'chalk';

export const interactionHandler = async (client: Client) => {
	const path: string = `${__dirname}/../interactions`;
	await readdirSync(path).forEach(async (type: string) => {
		await readdirSync(`${path}/${type}`).forEach(async (dir: string) => {
			const interactions: string[] = await readdirSync(`${path}/${type}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
			for (let interaction of interactions) {
				const int: Interaction = require(`${path}/${type}/${dir}/${interaction}`);
				await client.interactions.set(int.info.name, int);
			}
		});
	});
	console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All interactions have been loaded.')}`);
};
