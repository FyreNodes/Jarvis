import { CommandInfo, CommandRun } from "@/Interfaces";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const run: CommandRun = async (client, interaction) => {
    const img = await axios.get('https://nekos.life/api/v2/img/cuddle');
    const user = interaction.options.getUser('user');
    const embed = new EmbedBuilder({
        title: `${interaction.user.username} cuddles ${user.username} <3`,
        color: client.config.themeColor,
        image: { url: img.data.url },
        footer: { text: 'Jarvis Fun', iconURL: client.user.avatarURL() },
        timestamp: Date.now()
    });
    await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
    name: 'cuddle',
    category: 'fun',
    description: 'Give someone a nice big cuddle <3.',
    dm_permission: false,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user you would like to cuddle.',
            required: true
        }
    ]
};