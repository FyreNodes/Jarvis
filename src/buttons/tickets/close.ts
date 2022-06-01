import closeTicket from "@/functions/closeTicket";
import { ButtonInfo, ButtonRun } from "@/Interfaces";

export const run: ButtonRun = async (client, interaction) => {
    await closeTicket(client, interaction);
};

export const info: ButtonInfo = {
    custom_id: 'button.ticket.close',
    category: 'tickets'
};