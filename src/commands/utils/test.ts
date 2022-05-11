import { CommandInfo, CommandRun } from "@/Interfaces";
import { MessageActionRow, MessageButton } from "discord.js";

export const run: CommandRun = async (client, message, args) => {
    let testrow = new MessageActionRow({
        components: [
            new MessageButton({
                customId: 'test',
                label: 'Test',
                style: 'PRIMARY'
            })
        ]
    });
    message.channel.send({ components: [testrow] });
};

export const info: CommandInfo = {
    name: 'test',
    category: 'test'
};