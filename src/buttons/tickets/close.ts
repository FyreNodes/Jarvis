import closeTicket from "@/functions/closeTicket";
import { ButtonInfo, ButtonRun } from "@/Interfaces";
import { ButtonInteraction } from "discord.js";

export const run: ButtonRun = async (client, interaction: ButtonInteraction) => {
    await closeTicket(client, interaction);
};

export const info: ButtonInfo = {
    custom_id: 'button.ticket.close',
    category: 'tickets'
};