import Client from "@/Client";
import { BasicCommand } from "@/Interfaces";
import { readdirSync } from "fs";

export const basicCommandHandler = async (client: Client) => {
    const path: string = `${__dirname}/../commands/basic`;
    await readdirSync(path).forEach(async (dir: string) => {
        const commands: string[] = readdirSync(`${path}/${dir}`).filter((file: string) => file.endsWith('.ts'));
        for (const cmd of commands) {
            const command: BasicCommand = require(`${path}/${dir}/${cmd}`);
            await client.basicCommands.set(command.info.name, command);
        };
    });
};