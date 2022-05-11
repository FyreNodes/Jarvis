import Client from "@/Client";
import { Interaction } from "@/Interfaces";

export default async (client: Client, interaction: Interaction) => {
    await client.interactions.set(interaction.info.name, interaction);
};