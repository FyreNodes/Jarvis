import { BaseCommandInfo, BaseCommandRun } from "@/Interfaces";
import axios from "axios";
import { Collection, Message } from "discord.js";

export const run: BaseCommandRun = async (client, message, args) => {
    const init = Date.now();
    const zones: Collection<string, string> = new Collection();
    await axios.get('https://api.cloudflare.com/client/v4/zones', {
        headers: {
            'Authorization': `Bearer ${process.env.CF_API_TOKEN}`
        }
    }).then((res) => res.data.result.forEach((z) => zones.set(z.name, z.id)));
    if (!args[0]) return message.reply({ content: 'Please specify a zone!'});
    if (!args[1]) return message.reply({ content: 'Please specify a field!'});
    if (!zones.has(args[0])) return message.reply({ content: 'Invalid zone!'});
    switch (args[1]) {
        case 'settings.security_level':
            switch (args[2]) {
                case 'set':
                    if (!['essentially_off', 'low', 'medium', 'high', 'under_attack'].includes(args[3])) return message.reply({ content: 'Invalid security level!'});
                    await axios({
                        method: 'PATCH',
                        url: `https://api.cloudflare.com/client/v4/zones/${zones.get(args[0])}/settings/security_level`,
                        headers: {
                            'X-Auth-Email': process.env.CF_EMAIL,
                            'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
                        },
                        data: {
                            'value': args[3]
                        }
                    }).then((res) => {
                        if (!res.data.success) return message.channel.send({ content: `🔴 **Failed** (${init - Date.now()}ms) - Code: ${res.data.errors[0].code} - Message:\`\`\`txt\n${res.data.errors[0].message}\n\`\`\`` });
                        return message.channel.send({ content: `Success (${Date.now() - init}ms)` });
                    }).catch((err) => {return message.channel.send({ content: `🔴 **Failed** (${Date.now() - init}ms) - Code: ${err.response.status} - Message:\`\`\`txt\n${err.response.data.errors[0].message}\n\`\`\`` })});
                break;

                default: return message.reply({ content: 'Invalid operation!'});
            };
        break;

        default: return message.reply({ content: 'Invalid field!' });
    };
};

export const info: BaseCommandInfo = {
    name: 'cf',
    category: 'admin',
    permissionLevel: 8
};