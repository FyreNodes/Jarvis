import { BasicCommandInfo, BasicCommandRun } from "@/Interfaces";
import { Permissions } from "discord.js";

export const run: BasicCommandRun = (client, message, args) => {
    message.channel.send({ content: `${client.ws.ping}` });
};

export const info: BasicCommandInfo = {
    name: 'ping',
    category: 'utils',
    permissions: ["MANAGE_MESSAGES"]
}