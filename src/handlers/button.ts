import Client from '@/Client';
import { Button } from '@/Interfaces';
import { readdirSync } from 'node:fs';
import { grey, green, white } from 'chalk';

export const buttonHandler = async (client: Client) => {
    const path: string = `${__dirname}/../buttons`;
    await readdirSync(path).forEach(async (dir: string) => {
		const buttons: string[] = await readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
		for (let button of buttons) {
			const btn: Button = require(`${path}/${dir}/${button}`);
			await client.buttons.set(btn.info.custom_id, btn);
		};
	});
    console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All buttons have been loaded.')}`);
};