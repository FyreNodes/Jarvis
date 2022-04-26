import Client from "@/Client";
import { ApplicationCommand } from "@/Interfaces";
import { readdirSync } from "fs";

export const applicationCommandHandler = async (client: Client) => {
    const path: string = `${__dirname}/../commands/application`;
    await readdirSync(path).forEach(async (dir: string) => {
        const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts'));
        for (const cmd of commands) {
            const command: ApplicationCommand = require(`${path}/${dir}/${cmd}`);
            await client.applicationCommands.set(command.info.name, command);
        };
    });
};