import { CommandInfo, CommandRun } from "@/Interfaces";
import axios from "axios";

export const run: CommandRun = async (client, interaction) => {
    let rating = 'pg13';
    if (interaction.options.getString('rating')) rating = interaction.options.getString('rating');
    const req = await axios.get(`https://api.truthordarebot.xyz/v1/dare?rating=${rating}`);
    await interaction.reply({ content: req.data.question });
};

export const info: CommandInfo = {
    name: "dare",
    category: "fun",
    description: "Play truth or dare with your friends",
    dm_permission: true,
    options: [
        {
            type: 3,
            name: 'rating',
            description: 'The maturity rating of the truth or dare',
            choices: [
                { name: 'PG', value: 'pg' },
                { name: 'PG-13', value: 'pg13' },
                { name: 'R', value: 'r' }
            ]
        }
    ]
};