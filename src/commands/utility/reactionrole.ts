import reactionRole from '@/database/schemas/roles/reactionRole';
import reactionRoleGroup from '@/database/schemas/roles/reactionRoleGroup';
import { CommandInfo, CommandRun } from '@/Interfaces';
import permissions from '@/lib/permissions';
import gen from '@/utils/gen';
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ColorResolvable, EmbedBuilder, resolveColor, SelectMenuBuilder, SelectMenuComponentOptionData } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	let subcommand: boolean = undefined;
	await interaction.options.data.forEach(async (o) => {
		if (o.type === ApplicationCommandOptionType.SubcommandGroup) subcommand = true;
		else subcommand = false;
	});
	const id = interaction.options.getInteger('id');
	switch (interaction.options.getSubcommand()) {
		case 'create':
			const rID = await gen('id', 6);
			if (!subcommand) {
				if (!(await reactionRoleGroup.exists({ id: interaction.options.getInteger('group'), guild: interaction.guild.id }))) return await interaction.reply({ content: 'Invalid group id specified!' });
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
				let image: string = undefined;
				let color: ColorResolvable = undefined;
				if (interaction.options.getString('image')) {
					if (!parseUrl(interaction.options.getString('image'))) return await interaction.reply({ content: 'Invalid image url specified!' });
					image = interaction.options.getString('image');
				}
				if (interaction.options.getString('color')) {
					if (!validateHex(interaction.options.getString('color'))) return await interaction.reply({ content: 'Invalid color specified!' });
					color = interaction.options.getString('color').toUpperCase() as ColorResolvable;
				}
				await reactionRoleGroup.create({
					id: rID,
					guild: interaction.guild.id,
					name: interaction.options.getString('name'),
					description: interaction.options.getString('description'),
					image: image,
					color: color
				});
				await interaction.reply({ content: `Successfully created ${interaction.options.getString('name')} group.` });
			}
			break;

		case 'list':
			if (!subcommand) {
				if (!(await reactionRole.exists({ guild: interaction.guild.id }))) return await interaction.reply({ content: 'There are no reaction roles.' });
				const roles = await reactionRole.find({ guild: interaction.guild.id });
				let embed = new EmbedBuilder({
					title: `${interaction.guild.name} - Reaction Roles`,
					color: client.config.themeColor,
					description: roles.map((r) => {return `**ID:** ${r.id} - **Name:** ${r.name} - **Role:** <@&${r.role}>`}).join('\n'), // prettier-ignore
					footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
					timestamp: Date.now()
				});
				await interaction.reply({ embeds: [embed] });
			} else {
				if (!(await reactionRoleGroup.exists({ guild: interaction.guild.id }))) return await interaction.reply({ content: 'There are no reaction role groups.' });
				const groups = await reactionRoleGroup.find({ guild: interaction.guild.id });
				let embed = new EmbedBuilder({
					title: `${interaction.guild.name} - Reaction Role Groups`,
					color: client.config.themeColor,
					description: groups.map((r) => {return `**ID:** ${r.id} - **Name:** ${r.name}`}).join('\n'), // prettier-ignore
					footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
					timestamp: Date.now()
				});
				await interaction.reply({ embeds: [embed] });
			}
			break;

		case 'view':
			if (!subcommand) {
				if (!(await reactionRole.exists({ id: id, guild: interaction.guild.id }))) return await interaction.reply({ content: 'Invalid reaction role id specified!' });
				const role = await reactionRole.findOne({ id: id, guild: interaction.guild.id });
				let vEmbed = new EmbedBuilder({
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
				if (!(await reactionRoleGroup.exists({ id: interaction.options.getInteger('id'), guild: interaction.guild.id }))) return await interaction.reply({ content: 'Invalid group id specified!' });
				const group = await reactionRoleGroup.findOne({ id: id, guild: interaction.guild.id });
				let vEmbed = new EmbedBuilder({
					title: `${group.name} - ${group.id}`,
					color: resolveColor(group.color) || client.config.themeColor,
					description: group.description,
					image: { url: group.image },
					footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
					timestamp: Date.now()
				});
				await interaction.reply({ embeds: [vEmbed] });
			}
			break;

		case 'output':
			if (!(await reactionRoleGroup.exists({ id: interaction.options.getInteger('group'), guild: interaction.guild.id }))) return await interaction.reply({ content: 'Invalid group id specified!' });
			const group = await reactionRoleGroup.findOne({ guild: interaction.guild.id, id: interaction.options.getInteger('group') });
			let oEmbed = new EmbedBuilder({
				title: group.name,
				color: resolveColor(group.color) || client.config.themeColor,
				description: group.description,
				footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
				timestamp: Date.now()
			});
			const roles = await reactionRole.find({ group: interaction.options.getInteger('group'), guild: interaction.guild.id });
			const components: SelectMenuComponentOptionData[] = [];
			await roles.forEach((r) => {
				components.push({ label: r.name, description: r.description, value: `${interaction.guild.id}.rr.role.${r.id}`, emoji: null, default: false });
			});
			const component = new SelectMenuBuilder({ customId: `${interaction.guild.id}.rr.group.${group.id}`, options: components, minValues: 0, maxValues: components.length });
			const row = new ActionRowBuilder<SelectMenuBuilder>({ components: [component] });
			interaction.channel.send({ embeds: [oEmbed], components: [row] });
			break;

		case 'delete':
			if (!subcommand) {
				if (!(await reactionRole.exists({ id: id, guild: interaction.guild.id }))) return await interaction.reply({ content: 'Invalid reaction role id specified!' });
				await reactionRole.deleteOne({ id: id, guild: interaction.guild.id });
				await interaction.reply({ content: 'Successfully deleted reaction role.' });
			} else {
				if (!(await reactionRoleGroup.exists({ id: interaction.options.getInteger('id'), guild: interaction.guild.id }))) return await interaction.reply({ content: 'Invalid group id specified!' });
				const continueButton = new ButtonBuilder({ customId: 'btn.rr.group.delete.confirm', label: 'Continue', style: ButtonStyle.Success });
				const cancelButton = new ButtonBuilder({ customId: 'btn.rr.group.delete.cancel', label: 'Cancel', style: ButtonStyle.Danger });
				const row = new ActionRowBuilder<ButtonBuilder>({ components: [continueButton, cancelButton] });
				await interaction.reply({ content: '**Warning!** This action will delete the specified group and all reaction roles in it. Would you like to continue?', components: [row] });
				const collector = interaction.channel.createMessageComponentCollector();
				collector.on('collect', async (int) => {
					switch (int.customId) {
						case 'btn.rr.group.delete.confirm':
							ButtonBuilder.from(continueButton).setDisabled(true);
							ButtonBuilder.from(cancelButton).setDisabled(true);
							await int.update({ components: [row] });
							await reactionRole.deleteMany({ group: id, guild: interaction.guild.id });
							await reactionRoleGroup.deleteOne({ id: id, guild: interaction.guild.id });
							await interaction.channel.send({ content: 'Successfully deleted group.' });
							break;

						case 'btn.rr.group.delete.cancel':
							ButtonBuilder.from(continueButton).setDisabled(true);
							ButtonBuilder.from(cancelButton).setDisabled(true);
							await int.update({ components: [row] });
							await interaction.channel.send({ content: 'Action was cancelled.' });
							break;
					}
				});
			}
			break;
	}
};

export const info: CommandInfo = {
	name: 'reactionrole',
	category: 'utility',
	description: 'Manage reaction roles.',
	dm_permission: false,
	default_member_permissions: permissions.manageGuild,
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
						},
						{
							type: 3,
							name: 'image',
							description: 'The image of the group (URL).',
							required: false
						},
						{
							type: 3,
							name: 'color',
							description: 'The color of the group (Hex).',
							required: false
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
					description: 'Delete a group.',
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

function parseUrl(url: string): boolean {
	const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	return res !== null;
}

function validateHex(hex: string): boolean {
	if (hex.startsWith('#') && hex.length == 7) return true;
	return false;
}
