import reactionRole from "@/database/schemas/roles/reactionRole";
import reactionRoleGroup from "@/database/schemas/roles/reactionRoleGroup";
import { CommandInfo, CommandRun } from "@/Interfaces";
import gen from "@/utils/gen";
import { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageSelectOptionData } from "discord.js";

export const run: CommandRun = async (client, interaction) => {
    let subcommand: boolean = undefined;
    await interaction.options.data.forEach(async (o) => {o.type === 'SUB_COMMAND_GROUP' ? subcommand = true : subcommand = false});
    const id = interaction.options.getInteger('id');
    switch (interaction.options.getSubcommand()) {
        case 'create':
            const rID = await gen('id', 6);
            if (!subcommand) {
                if (!await reactionRoleGroup.exists({ id: interaction.options.getInteger('group'), guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid group id specified!' });
                await reactionRole.create({
                    id: rID,
                    guild: interaction.guild.id,
                    group: interaction.options.getInteger('group'),
                    name: interaction.options.getString('name'),
                    description: interaction.options.getString('description'),
                    role: interaction.options.getRole('role')?.id
                });
                await interaction.reply({ content: `Successfully created ${interaction.options.getString('name')} reaction role.` });
            } else {
                await reactionRoleGroup.create({ id: rID, guild: interaction.guild.id, name: interaction.options.getString('name'), description: interaction.options.getString('description') });
                await interaction.reply({ content: `Successfully created ${interaction.options.getString('name')} group.` });
            }
        break;

        case 'list':
            if (!subcommand) {
                const roles = await reactionRole.find({ guild: interaction.guild.id });
                let embed = new MessageEmbed({
                    title: `${interaction.guild.name} - Reaction Roles`,
                    color: client.config.themeColor,
                    description: roles.map((r) => { return `**ID:** ${r.id} - **Name:** ${r.name} - **Role:** <@&${r.role}>` }).join('\n'),
                    footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
                    timestamp: Date.now()
                });
                await interaction.reply({ embeds: [embed] });
            } else {
                const groups = await reactionRoleGroup.find({ guild: interaction.guild.id });
                let embed = new MessageEmbed({
                    title: `${interaction.guild.name} - Reaction Role Groups`,
                    color: client.config.themeColor,
                    description: groups.map((r) => { return `**ID:** ${r.id} - **Name:** ${r.name}` }).join('\n'),
                    footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
                    timestamp: Date.now()
                });
                await interaction.reply({ embeds: [embed] });
            };
        break;

        case 'view':
            if (!subcommand) {
                if (!await reactionRole.exists({ id: id, guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid reaction role id specified!' });
                const role = await reactionRole.findOne({ id: id, guild: interaction.guild.id });
                let vEmbed = new MessageEmbed({
                    title: `${role.name} - ${role.id}`,
                    color: client.config.themeColor,
                    fields: [
                        { name: 'Role:', value: `<@&${role.role}>` },
                        { name: 'Description:', value: role.description }
                    ],
                    footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
                    timestamp: Date.now()
                });
                await interaction.reply({ embeds: [vEmbed] });
            } else {
                if (!await reactionRoleGroup.exists({ id: interaction.options.getInteger('id'), guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid group id specified!' });
                const group = await reactionRoleGroup.findOne({ id: id, guild: interaction.guild.id });
                let vEmbed = new MessageEmbed({
                    title: `${group.name} - ${group.id}`,
                    color: client.config.themeColor,
                    description: group.description,
                    footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
                    timestamp: Date.now()
                });
                await interaction.reply({ embeds: [vEmbed] });
            };
        break;

        case 'output':
            if (!await reactionRoleGroup.exists({ id: interaction.options.getInteger('group'), guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid group id specified!' });
            const group = await reactionRoleGroup.findOne({ guild: interaction.guild.id, id: interaction.options.getInteger('group') });
            let oEmbed = new MessageEmbed({
                title: group.name,
                color: client.config.themeColor,
                description: group.description,
                footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
                timestamp: Date.now()
            });
            const roles = await reactionRole.find({ group: interaction.options.getInteger('group'), guild: interaction.guild.id });
            const components: MessageSelectOptionData[] = [];
            await roles.forEach((r) => {
                components.push({ label: r.name, description: r.description, value: `${interaction.guild.id}.rr.role.${r.id}`, emoji: null, default: false });
            });
            const component = new MessageSelectMenu({ customId: `${interaction.guild.id}.rr.group.${group.id}`, options: components, minValues: 0, maxValues: components.length });
            const row = new MessageActionRow({ components: [component] });
            interaction.channel.send({ embeds: [oEmbed], components: [row] });
        break;

        case 'delete':
            if (!subcommand) {
                if (!await reactionRole.exists({ id: id, guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid reaction role id specified!' });
                await reactionRole.deleteOne({ id: id, guild: interaction.guild.id });
                await interaction.reply({ content: 'Successfully deleted reaction role.' });
            } else {
                if (!await reactionRoleGroup.exists({ id: interaction.options.getInteger('id'), guild: interaction.guild.id })) return await interaction.reply({ content: 'Invalid group id specified!' });
                await reactionRoleGroup.deleteOne({ id: id, guild: interaction.guild.id });
                await interaction.reply({ content: 'Successfully deleted group.' });
            }
        break;
    }
};

export const info: CommandInfo = {
    name: 'reactionrole',
    category: 'utility',
    description: 'Manage reaction roles',
    dm_permission: false,
    default_member_permissions: Number(1 << 5),
    options: [
        {
            type: 1,
            name: 'create',
            description: 'Create a new reaction role.',
            options: [
                {
                    type: 4,
                    name: 'group',
                    description: 'The ID of the group for the reaction role.',
                    required: true
                },
                {
                    type: 3,
                    name: 'name',
                    description: 'The name of the reaction role.',
                    required: true
                },
                {
                    type: 3,
                    name: 'description',
                    description: 'The description of the reaction role.',
                    required: true
                },
                {
                    type: 8,
                    name: 'role',
                    description: 'The role to use for the reaction role.',
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: 'list',
            description: 'List all reaction roles.'
        },
        {
            type: 1,
            name: 'view',
            description: 'View a reaction role.',
            options: [
                {
                    type: 4,
                    name: 'id',
                    description: 'The ID of the reaction role.',
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: 'delete',
            description: 'Delete a reaction role.',
            options: [
                {
                    type: 4,
                    name: 'id',
                    description: 'The ID of the reaction role.',
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: 'output',
            description: 'Sends the reaction role embed.',
            options: [
                {
                    type: 4,
                    name: 'group',
                    description: 'The ID of the group to send.',
                    required: true
                }
            ]
        },
        {
            type: 2,
            name: 'group',
            description: 'Manage reaction role groups.',
            options: [
                {
                    type: 1,
                    name: 'create',
                    description: 'Create a new group.',
                    options: [
                        {
                            type: 3,
                            name: 'name',
                            description: 'The name of the group.',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'description',
                            description: 'The description of the group.',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'list',
                    description: 'List all groups.'
                },
                {
                    type: 1,
                    name: 'view',
                    description: 'View a group.',
                    options: [
                        {
                            type: 4,
                            name: 'id',
                            description: 'The ID of the group.',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'delete',
                    description: 'Delete a group',
                    options: [
                        {
                            type: 4,
                            name: 'id',
                            description: 'The ID of the group.',
                            required: true
                        }
                    ]
                }
            ]
        }
    ]
};

