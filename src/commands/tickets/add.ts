import ticket from "@/database/schemas/ticket";
import { CommandInfo, CommandRun } from "@/Interfaces";
import { TextChannel } from "discord.js";

export const run: CommandRun = async (client, interaction) => {
    if (!(await ticket.exists({ channel: interaction.channel.id }))) return await interaction.reply({ content: 'This is not a ticket.', ephemeral: true });
    const channel = interaction.channel as TextChannel;
    const user = interaction.options.getUser('user');
    channel.permissionOverwrites.create(user, {
        ViewChannel: true,
        SendMessages: true,
        AttachFiles: true,
        EmbedLinks: true,
        AddReactions: true,
        ReadMessageHistory: true,
        UseExternalEmojis: true,
        UseExternalStickers: true
    }, { reason: `Automated Action: Tickets - User Added` });
    interaction.reply({ content: `${user.tag} has been added to the ticket.` });
};

export const info: CommandInfo = {
    name: 'add',
    category: 'tickets',
    description: 'Add a user to a ticket.',
    dm_permission: false,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to add.',
            required: true
        }
    ]
};