import Client from '@/Client';
import { grey, magentaBright, white, cyanBright } from 'chalk';

export default async (client: Client) => {
	client.user.setPresence({ status: client.config.presence.status, activities: [{ type: client.config.presence.activity.type, name: client.config.presence.activity.name, url: client.config.presence.activity.url && client.config.presence.activity.url }] });
	console.log(`${grey.bold('[')}${magentaBright.bold('CLIENT')}${grey.bold(']')} ${white(`Logged into Discord as: ${client.user.tag}`)}`);
	console.log(`${grey.bold('[')}${cyanBright.bold('STARTUP')}${grey.bold(']')} ${white.bold('Client is ready.')}`);
};
