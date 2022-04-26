import { ApplicationCommandInfo, ApplicationCommandRun } from "@/Interfaces";

export const run: ApplicationCommandRun = async (client, interaction) => {
    interaction.reply({ content: `${client.ws.ping}` });
};

export const info: ApplicationCommandInfo = {
    name: 'ping',
    description: 'Simple ping command',
    category: 'utils'
};