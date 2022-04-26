import Client from "@/Client";
import messageCreate from "@/events/messageCreate";
import ready from "@/events/ready";
import interactionCreate from "@/events/interactionCreate";
import { CommandInteraction, Message } from "discord.js";

export const eventHandler = (client: Client) => {
    client.once('ready', () => ready());
    client.on('messageCreate', async (message: Message) => messageCreate(client, message));
    client.on('interactionCreate', async (interaction: CommandInteraction) => interactionCreate(client, interaction));
};