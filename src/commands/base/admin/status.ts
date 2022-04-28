import { CommandRun, CommandInfo } from '@/Interfaces';
import config from '@/database/schemas/config';

export const run: CommandRun = async (client, message, args) => {
	if (!args[0]) return message.reply({ content: 'You did not specify the status type!' });
	if (!args[1]) return message.reply({ content: 'You did not specify the status message or url!' });

	switch (args[0]) {
		case 'PLAYING':
			const plName: string = message.content.split(' ').slice(2).join(' ');
			client.user.setPresence({ status: 'online', activities: [{ type: args[0], name: plName }] });
			await config.updateOne({ guildID: message.guild.id }, { status: { type: args[0], msg: plName } });
			message.channel.send({ content: 'Status has been successfully set.' });
			break;

		case 'WATCHING':
			const waName: string = message.content.split(' ').slice(2).join(' ');
			client.user.setPresence({ status: 'online', activities: [{ type: args[0], name: waName }] });
			await config.updateOne({ guildID: message.guild.id }, { status: { type: args[0], msg: waName } });
			message.channel.send({ content: 'Status has been successfully set.' });
			break;

		case 'STREAMING':
			const stName: string = message.content.split(' ').slice(3).join(' ');
			if (!stName) return message.reply('You did not specify the status message!');
			client.user.setPresence({ status: 'online', activities: [{ type: args[0], name: stName, url: args[1] }] });
			await config.updateOne(
				{ guildID: message.guild.id },
				{ status: { type: args[0], msg: stName, url: args[1] } }
			);
			message.channel.send({ content: 'Status has been successfully set.' });
			break;

		case 'LISTENING':
			const liName: string = message.content.split(' ').slice(2).join(' ');
			client.user.setPresence({ status: 'online', activities: [{ type: args[0], name: liName }] });
			await config.updateOne({ guildID: message.guild.id }, { status: { type: args[0], msg: liName } });
			message.channel.send({ content: 'Status has been successfully set.' });
			break;

		default:
			return message.reply(`Invalid status type specified! Data: ${args[0]}`);
			break;
	}
};

export const info: CommandInfo = {
	name: 'status',
	category: 'admin',
	permissions: ['ADMINISTRATOR']
};
