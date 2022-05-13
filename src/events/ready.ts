import Client from '@/Client';
import config from '@/database/schemas/config';
import { grey, magentaBright, white, cyanBright } from 'chalk';

export default async (client: Client) => {
	const cfg = await config.findOne({ guildID: '961161868968333353' });
	const status = await cfg.get('status');
	client.user.setPresence({ status: 'online', activities: [{ type: status.type, name: status.msg }] });
	console.log(`${grey.bold('[')}${magentaBright.bold('CLIENT')}${grey.bold(']')} ${white(`Logged into Discord as: ${client.user.tag}`)}`);
	console.log(`${grey.bold('[')}${cyanBright.bold('STARTUP')}${grey.bold(']')} ${white.bold('Client is ready.')}`);
};
