import { CommandInfo, CommandRun } from "@/Interfaces";
import axios from "axios";

export const run: CommandRun = async (client, interaction) => {
    const req = await axios.get('https://api.adviceslip.com/advice');
    await interaction.reply({ content: req.data.slip.advice });
};

export const info: CommandInfo = {
    name: "advice",
    category: "fun",
    description: "Get a random peice of advice",
    dm_permission: true
};