import { CommandInfo, CommandRun } from "@/Interfaces";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

export const run: CommandRun = async (client, interaction) => {
    const img = await axios.get('https://nekos.life/api/v2/img/hug');
    const user = interaction.options.getUser('user');
    const embed = new EmbedBuilder({
        title: `${interaction.user.username} hugs ${user.username} <3`,
        color: client.config.themeColor,
        image: { url: img.data.url },
        footer: { text: 'Jarvis Fun', iconURL: client.user.avatarURL() },
        timestamp: Date.now()
    });
    await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
    name: 'hug',
    category: 'fun',
    description: 'Give someone a nice big hug <3.',
    dm_permission: false,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user you would like to hug.',
            required: true
        }
    ]
};