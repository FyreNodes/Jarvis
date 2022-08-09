import ticket from "@/database/schemas/ticket";
import { CommandInfo, CommandRun } from "@/Interfaces";
import { TextChannel } from "discord.js";

export const run: CommandRun = async (client, interaction) => {
    if (!(await ticket.exists({ channel: interaction.channel.id }))) return await interaction.reply({ content: 'This is not a ticket.', ephemeral: true });
    const channel = interaction.channel as TextChannel;
    const user = interaction.options.getUser('user');
    channel.permissionOverwrites.delete(user, `Automated Action: Tickets - User Removed`);
    await interaction.reply({ content: `${user.tag} has been removed from the ticket.` });
};

export const info: CommandInfo = {
    name: 'remove',
    category: 'tickets',
    description: 'Remove a user from a ticket.',
    dm_permission: false,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to remove.',
            required: true
        }
    ]
};