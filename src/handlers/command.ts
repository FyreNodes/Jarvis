import Client from "@/Client";
import { Command } from "@/Interfaces";
import { readdirSync } from "fs";

export const commandHandler = async (client: Client) => {
    const path: string = `${__dirname}/../commands/base`;
    await readdirSync(path).forEach(async (dir: string) => {
        const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts'));
        for (const cmd of commands) {
            const command: Command = require(`${path}/${dir}/${cmd}`);
            await client.commands.set(command.info.name, command);
        };
    });
};