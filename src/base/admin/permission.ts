import { BaseCommandRun, BaseCommandInfo } from "@/Interfaces";
import permission from '@/database/schemas/permission';
import getUser from "@/utils/getUser";
import { Message } from "discord.js";

export const run: BaseCommandRun = async (client, message, args) => {
    const init = Date.now();
    if (!args[0]) return message.reply({ content: 'Please specify a user!' });
    const user = await getUser(message, message.mentions.users.first() || args[0]);
    switch (args[1]) {
        case 'set':
            validateArgs(message, args, true);
            if (await permission.exists({ user: user.id, level: parseInt(args[2]) })) return message.channel.send({ content: 'The specified user already has that permission level.' });
            await permission.create({ user: user.id, level: parseInt(args[2]) });
            message.channel.send({ content: `Success (${Date.now() - init}ms)` });
            break;
        case 'remove':
            validateArgs(message, args, false);
            if (!await permission.exists({ user: user.id })) return message.channel.send({ content: 'This user does not have a permission level.' });
            await permission.deleteOne({ user: user.id });
            message.channel.send({ content: `Success (${Date.now() - init}ms)` }); 
            break;
        default:
            if (!await permission.exists({ user: user.id})) return message.channel.send({ content: 'This user does not have a permission level.' });
            const perm: number = (await permission.findOne({ user: user.id})).level;
            message.channel.send({ content: `${user.user.username} has a permission level of ${perm}.` });
            break;
    };
};

export const info: BaseCommandInfo = {
    name: "permission",
    category: 'admin',
    userWl: ['762931157498331157']
};

function validateArgs(message: Message, args: string[], full: boolean) {
    if (full) {
        if (!args[1]) return message.reply({ content: 'Please specify an action!' });
        if (!args[2]) return message.reply({ content: 'Please specify a permission level.' });
        if (!['set', 'remove'].includes(args[1])) return message.reply({ content: 'Invalid action specified!' });
        if (![1,2,3,4,5,6,7,8,9].includes(parseInt(args[2]))) return message.reply({ content: 'Invalid permission level specified!' });
    } else {
        if (!args[1]) return message.reply({ content: 'Please specify an action!' });
        if (!['set', 'remove'].includes(args[1])) return message.reply({ content: 'Invalid action specified!' });
    };
};
