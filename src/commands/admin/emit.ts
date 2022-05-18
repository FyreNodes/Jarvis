import { CommandInfo, CommandRun } from "@/Interfaces";

export const run: CommandRun = async (client, message, args) => {
    client.emit('guildMemberAdd', message.member);
};

export const info: CommandInfo = {
    name: 'emit',
    category: 'admin',
    permissions: ['ADMINISTRATOR']
};