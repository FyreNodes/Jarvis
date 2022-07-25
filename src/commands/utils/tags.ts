import tag from "@/database/schemas/tag";
import { CommandInfo, CommandRun } from "@/Interfaces";
import permissions from "@/lib/permissions";
import gen from "@/utils/gen";
import { MessageEmbed } from "discord.js";

export const run: CommandRun = async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
        case 'create':
            const cName = interaction.options.getString('name').toLowerCase();
            if (await tag.exists({ name: cName })) return await interaction.reply({ content: 'A tag with this name already exists!' });
            const cID = await gen('id', 6);
            await tag.create({ id: cID, name: cName, content: interaction.options.getString('content'), guild: interaction.guild.id });
            await interaction.reply({ content: 'Tag was successfully created.' });
        break;

        case 'list':
            if (!await tag.exists({ guild: interaction.guild.id })) return await interaction.reply({ content: 'There are no tags.' });
            const lTags = await tag.find({ guild: interaction.guild.id });
            const lEmbed = new MessageEmbed({
                title: `${interaction.guild.name} - Tags`,
                color: client.config.themeColor,
                description: lTags.map((t) => {return `**ID:** ${t.id} - **Name:** ${t.name}`}).join('\n'),
                footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
                timestamp: Date.now()
            });
            await interaction.reply({ embeds: [lEmbed] });
        break;

        case 'delete':
            const dID = interaction.options.getInteger('id');
            if (!await tag.exists({ id: dID, guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid tag id specified!' });
            await tag.deleteOne({ id: dID, guild: interaction.guild.id });
            await interaction.reply({ content: 'Successfully deleted tag.' });
        break;
    };
};

export const info: CommandInfo = {
    name: 'tags',
    category: 'utility',
    description: 'Manage your servers tags.',
    dm_permission: false,
    default_member_permissions: permissions.manageGuild,
    options: [
        {
            type: 1,
            name: 'create',
            description: 'Create a new tag.',
            options: [
                {
                    type: 3,
                    name: 'name',
                    description: 'The name of the tag.',
                    required: true
                },
                {
                    type: 3,
                    name: 'content',
                    description: 'The content of the tag.',
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: 'list',
            description: 'List all available tags.'
        },
        {
            type: 1,
            name: 'delete',
            description: 'Delete a tag.',
            options: [
                {
                    type: 4,
                    name: 'id',
                    description: 'The id of the tag to delete.',
                    required: true
                }
            ]
        }
    ]
}