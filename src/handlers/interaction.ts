import Client from '@/Client';
import { Interaction } from '@/Interfaces';
import { readdirSync } from 'fs';

export const interactionHandler = async (client: Client) => {
	const path: string = `${__dirname}/../interactions`;
	await readdirSync(path).forEach(async (type: string) => {
		await readdirSync(`${path}/${type}`).forEach(async (dir: string) => {
			const interactions: string[] = await readdirSync(`${path}/${type}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
			for (let interaction of interactions) {
				const int: Interaction = require(`${path}/${type}/${dir}/${interaction}`);
				await client.interactions.set(int.info.name, int);
			};
		});
	});
};
