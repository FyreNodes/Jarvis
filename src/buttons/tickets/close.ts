import closeTicket from "@/functions/closeTicket";
import { InteractionInfo, InteractionRun } from "@/Interfaces";
import { ButtonInteraction } from "discord.js";

export const run: InteractionRun = async (client, interaction: ButtonInteraction) => {
    await closeTicket(client, interaction);
};

export const info: InteractionInfo = {
    name: 'button.ticket.close',
    category: 'tickets',
    description: 'Close a ticket',
    intType: 'button'
};