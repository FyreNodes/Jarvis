import { BaseCommandInfo, BaseCommandRun, CommandInfo } from '@/Interfaces';
import axios from 'axios';

export const run: BaseCommandRun = (client, message, args) => {
	message.channel.send({ content: 'Updating... Please wait. This process may take a moment.' }).then(async (msg) => {
		const commands: CommandInfo[] = Array();
		client.commands.forEach((data) => {
			commands.push(data.info);
		});
		await axios({
			method: 'PUT',
			url: `https://discord.com/api/v9/applications/${client.user.id}/commands`,
			headers: { Authorization: `Bot ${process.env.TOKEN}`, 'Content-Type': 'application/json' },
			data: commands
		})
			.then((res) => {
				msg.edit({ content: `Request Completed - OK - Code: \`${res.status}\`` });
				//console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
				return msg.edit({ content: `Request Completed - Error:\n\`\`\`txt\n${err}\n\`\`\`` });
			});
	});
};

export const info: BaseCommandInfo = {
	name: 'update',
	category: 'admin',
	permissions: ['ADMINISTRATOR']
};
