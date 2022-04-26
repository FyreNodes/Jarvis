import Client from "@/Client";
import { ApplicationCommand } from "@/Interfaces";
import { CommandInteraction } from "discord.js";

export default (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;
    const cmd: string = interaction.commandName.toString().toLowerCase();
    const command: ApplicationCommand = client.applicationCommands.get(cmd);
    if (!command) return;
    command.run(client, interaction);
}