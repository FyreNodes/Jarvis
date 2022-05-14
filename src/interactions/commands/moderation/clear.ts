import { InteractionInfo, InteractionRun } from "@/Interfaces";
import { CommandInteraction } from "discord.js";
import ms from "ms";

export const run: InteractionRun = async (client, interaction: CommandInteraction) => {
    const messages = await interaction.channel.messages.fetch({ limit: interaction.options.getNumber('amount') });
    const useable = messages.filter((m) => m.createdTimestamp - Date.now() < ms('14d') && !m.pinned);
    await interaction.channel.bulkDelete(useable);
    await interaction.reply({ content: 'Successfully deleted messages.' });
    setTimeout(async () => {
        await interaction.deleteReply();
    }, 3000);
};

export const info: InteractionInfo = {
    name: 'clear',
    category: 'moderation',
    description: 'Purges messages in current channel',
    intType: 'command',
    default_member_permissions: 0x10,
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