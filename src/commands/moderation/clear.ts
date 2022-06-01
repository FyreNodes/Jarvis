import { CommandInfo, CommandRun } from "@/Interfaces";
import { CommandInteraction } from "discord.js";
import ms from "ms";

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
    const messages = await interaction.channel.messages.fetch({ limit: interaction.options.getNumber('amount') });
    const useable = messages.filter((m) => m.createdTimestamp - Date.now() < ms('14d') && !m.pinned);
    await interaction.channel.bulkDelete(useable);
    await interaction.reply({ content: 'Successfully deleted messages.' });
    setTimeout(async () => {
        await interaction.deleteReply();
    }, 3000);
};

export const info: CommandInfo = {
    name: 'clear',
    category: 'moderation',
    description: 'Purges messages in current channel',
    default_member_permissions: 0x10,
    dm_permission: false,
    options: [
        {
            type: 10,
            name: 'amount',
            description: 'Amount of messages to purge',
            required: true,
            min_value: 1,
            max_value: 100
        }
    ]
};