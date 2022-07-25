import ticket from '@/database/schemas/ticket';
import { CommandInfo, CommandRun } from '@/Interfaces';
import formatDept from '@/utils/formatDept';
import gen from '@/utils/gen';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionsBitField } from 'discord.js';

export const run: CommandRun = async (client, interaction) => {
	if (await ticket.exists({ guild: interaction.guild.id, user: interaction.user.id, status: 'open' })) return interaction.reply({ content: 'You already have an open ticket.', ephemeral: true });
	const id = await gen('id', 6);
	const department = interaction.options.getString('department');
	const permissions: bigint[] = [
		PermissionsBitField.Flags.ViewChannel,
		PermissionsBitField.Flags.SendMessages,
		PermissionsBitField.Flags.AttachFiles,
		PermissionsBitField.Flags.EmbedLinks,
		PermissionsBitField.Flags.AddReactions,
		PermissionsBitField.Flags.ReadMessageHistory,
		PermissionsBitField.Flags.UseExternalEmojis,
		PermissionsBitField.Flags.UseExternalStickers
	];
	const channel = await interaction.guild.channels.create({
		type: ChannelType.GuildText,
		name: `${department}-${interaction.user.username}`,
		topic: `${formatDept(department)} support ticket for ${interaction.user.tag} (${interaction.user.id})`,
		reason: 'Automated Action: Ticket Created',
		parent: client.config.tickets,
		position: 1,
		permissionOverwrites: [
			{
				id: client.config.roles.support,
				allow: permissions
			},
			{
				id: interaction.user.id,
				allow: permissions
			},
			{
				id: interaction.guild.id,
				deny: [PermissionsBitField.Flags.ViewChannel]
			}
		]
	});
	let embed = new EmbedBuilder({
		title: `${formatDept(department)} Support - New Ticket`,
		color: client.config.themeColor,
		thumbnail: { url: interaction.user.avatarURL() },
		description: `**ID:** ${id}
		**Member:** ${interaction.user.tag} (<@!${interaction.user.id}>)
		**Verified:** ${interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(client.config.roles.verified) ? 'Yes' : 'No'}
		**Joined:** ${interaction.guild.members.cache.get(interaction.user.id).joinedAt.toDateString()}
		**Created:** ${interaction.guild.members.cache.get(interaction.user.id).user.createdAt.toDateString()}`,
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	const closeButton = new ButtonBuilder({ customId: 'btn.ticket.close', label: 'Close', emoji: '🔒', style: ButtonStyle.Danger });
	const actionRow = new ActionRowBuilder<ButtonBuilder>({ components: [closeButton] });
	await ticket.create({ guild: interaction.guild.id, user: interaction.user.id, channel: channel.id, ticketID: id, status: 'open', department: department });
	await interaction.reply({ content: `Ticket has been created. <#${channel.id}>`, ephemeral: true });
	channel.send({ content: `<@!${interaction.user.id}>` }).then(async (msg) => await msg.delete());
	channel.send({ embeds: [embed], components: [actionRow] }).then((msg) => msg.pin());
};

export const info: CommandInfo = {
	name: 'open',
	category: 'tickets',
	description: 'Open a support ticket.',
	dm_permission: false,
	options: [
		{
			type: 3,
			name: 'department',
			description: 'Support department to open the ticket in.',
			required: true,
			autocomplete: false,
			choices: [
				{
					name: 'Technical',
					value: 'tech'
				},
				{
					name: 'Billing',
					value: 'billing'
				},
				{
					name: 'General',
					value: 'general'
				}
			]
		}
	]
};
