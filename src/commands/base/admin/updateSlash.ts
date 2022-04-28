import { SlashCommand, CommandInfo, CommandRun } from '@/Interfaces';
import axios, { AxiosResponse } from 'axios';
import { Message } from 'discord.js';

export const run: CommandRun = (client, message, args) => {
	message.channel
		.send('Updating... This process may take up to 15 seconds to complete.')
		.then(async (msg: Message) => {
			const responces: number[] = [];
			client.slashCommands.forEach(async (data: SlashCommand) => {
				const JSONdata = JSON.parse(JSON.stringify(data.info));
				await axios({
					method: 'POST',
					url: `https://discord.com/api/v9/applications/805565109992685580/commands`,
					headers: {
						Authorization: `Bot ${process.env.TOKEN}`,
						'Content-Type': 'application/json'
					},
					data: JSONdata
				}).then(async (responce: AxiosResponse) => {
					responces.push(responce.status);
					console.log(responce.data);
				});
			});
			setTimeout(() => {
				const messageResponce = responces.toString().replace(',', ', ');
				if (responces.includes(400 | 404)) {
					msg.edit(`Request Failed - Output: \`\`\`css ${messageResponce}\`\`\``);
				} else {
					msg.edit(`Request Completed - OK - Output: \`\`\`${messageResponce}\`\`\``);
				}
			}, 10000);
		});
};

export const info: CommandInfo = {
	name: 'update',
	category: 'admin',
	permissions: ['ADMINISTRATOR']
};
