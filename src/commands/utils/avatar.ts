import { CommandInfo, CommandRun } from "@/Interfaces";
import getUser from "@/utils/getUser";

export const run: CommandRun = async (client, interaction) => {
    const user = await getUser(interaction, interaction.options.getUser('user') || interaction.user);
    await interaction.reply({ content: user.displayAvatarURL({ size: 512, format: 'png', dynamic: true }) });
};

export const info: CommandInfo = {
    name: 'avatar',
    category: 'utility',
    description: 'Get a users avatar.',
    dm_permission: false,
    options: [
        {
            type: 6,
            name: 'user',
            description: 'User whos avatar you want to get.'
        }
    ]
}