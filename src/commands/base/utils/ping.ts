import { CommandInfo, CommandRun } from "@/Interfaces";

export const run: CommandRun = (client, message, args) => {
    message.channel.send({ content: `${client.ws.ping}` });
};

export const info: CommandInfo = {
    name: 'ping',
    category: 'utils',
    permissions: ["MANAGE_MESSAGES"]
}