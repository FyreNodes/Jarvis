import { BaseCommandInfo, BaseCommandRun } from '@/Interfaces';
import { Collection, Message } from 'discord.js';
import cloudflare from '@/utils/cloudflare';
import { AxiosResponse } from 'axios';

export const run: BaseCommandRun = async (client, message, args) => {
	const init = Date.now();
	const zones: Collection<string, string> = new Collection();
	await cloudflare.get('/zones').then((res) => res.data.result.forEach((z) => zones.set(z.name, z.id)));
	if (!args[0]) return message.reply({ content: 'Please specify a zone!' });
	if (!args[1]) return message.reply({ content: 'Please specify a field!' });
	if (!zones.has(args[0])) return message.reply({ content: 'Invalid zone!' });
	switch (args[1]) {
		case 'settings.security_level':
			if (!['essentially_off', 'low', 'medium', 'high', 'under_attack'].includes(args[2])) return message.reply({ content: 'Invalid security level!' });
			await cloudflare({
				method: 'PATCH',
				url: `/zones/${zones.get(args[0])}/settings/security_level`,
				data: {
					value: args[3]
				}
			})
				.then((res) => completed(message, res, init))
				.catch((err) => error(message, err, init));
			break;

		case 'purge_cache':
			await cloudflare({
				method: 'POST',
				url: `/zones/${zones.get(args[0])}/purge_cache`,
				data: {
					purge_everything: true
				}
			})
				.then((res) => completed(message, res, init))
				.catch((err) => error(message, err, init));
			break;
		default:
			return message.reply({ content: 'Invalid field!' });
	}
};

export const info: BaseCommandInfo = {
	name: 'cf',
	category: 'admin',
	permissionLevel: 8
};

function completed(message: Message, res: AxiosResponse, init: number) {
	if (!res.data.success) return message.channel.send({ content: `🔴 **Failed** (${init - Date.now()}ms) - Code: ${res.data.errors[0].code} - Message:\`\`\`txt\n${res.data.errors[0].message}\n\`\`\`` });
	return message.channel.send({ content: `Success (${Date.now() - init}ms)` });
}

function error(message: Message, err: any, init: number) {
	return message.channel.send({ content: `🔴 **Failed** (${Date.now() - init}ms) - Code: ${err.response.status} - Message:\`\`\`txt\n${err.response.data.errors[0].message}\n\`\`\`` });
}
