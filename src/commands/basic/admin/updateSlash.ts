import { ApplicationCommand, BasicCommandInfo, BasicCommandRun } from "@/Interfaces";
import { Permissions } from "discord.js";
import axios, { AxiosResponse } from 'axios';
import config from '@config';
import { Message } from "discord.js";

export const run: BasicCommandRun = (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
    message.channel.send('Updating... This process may take up to 15 seconds to complete.').then(async (msg: Message) => {
        const responces: number[] = [];
        client.applicationCommands.forEach(async (data: ApplicationCommand) => {
            const JSONdata = JSON.parse(JSON.stringify(data.info));
            await axios({
                method: 'POST',
                url: `https://discord.com/api/v9/applications/805565109992685580/commands`,
                headers: {
                    'Authorization': `Bot ${config.bot.token}`,
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

export const info: BasicCommandInfo = {
    name: 'update',
    category: 'admin',
    permissions: []
}