import tag from "@/database/schemas/tag";
import { CommandInfo, CommandRun } from "@/Interfaces";

export const run: CommandRun = async (client, interaction) => {
    const name = interaction.options.getString('name').toLowerCase();
    if (!await tag.exists({ guild: interaction.guild.id, name: name })) return await interaction.reply({ content: 'Invalid tag specified!' });
    await interaction.deferReply();
    const content = (await tag.findOne({ guild: interaction.guild.id, name: name })).content;
    await interaction.deleteReply();
    await interaction.channel.send({ content: content });
};

export const info: CommandInfo = {
    name: 'tag',
    category: 'utility',
    description: 'Use a tag.',
    dm_permission: false,
    options: [
        {
            type: 3,
            name: 'name',
            description: 'The name of the tag.',
            required: true
        }
    ]
};