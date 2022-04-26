import Client from "@/Client";
import botConfig from "@/database/schemas/config";
import { BasicCommand } from "@/Interfaces";
import { Message } from "discord.js";

export default async (client: Client, message: Message) => {
    const cfg = await botConfig.findOne({ guildID: message.guild.id });
    const prefix: string = await cfg.get('prefix');
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd: string = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    const command: BasicCommand = client.basicCommands.get(cmd);
    if (!command) return;
    if (!command.info.permissions) command.run(client, message, args);
    let user_perms = [];
    await command.info.permissions.forEach((perm) => {
        if (message.member.permissions.has(perm, true)) user_perms.push(true);
    });
    if (user_perms.includes(true)) command.run(client, message, args);
};