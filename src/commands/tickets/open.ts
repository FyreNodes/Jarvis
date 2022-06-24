import ticket from '@/database/schemas/ticket';
import { CommandInfo, CommandRun } from '@/Interfaces';
import gen from '@/utils/gen';
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, Permissions } from 'discord.js';

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
	if (await ticket.exists({ guild: interaction.guild.id, user: interaction.user.id, status: 'open' })) return interaction.reply({ content: 'You already have an open ticket.', ephemeral: true });
	const id = await gen('id', 6);
	const ch = await interaction.guild.channels.create(`${interaction.options.get('department').value}-${interaction.user.username}`, {
		type: 'GUILD_TEXT',
		parent: client.config.tickets,
		topic: `${interaction.options.get('department').value.toString().replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General')} Support ticket for ${interaction.user.tag} (${interaction.user.id})`,
		reason: 'Automated Action: Ticket Created',
		position: 1,
		permissionOverwrites: [
			{
				id: client.config.roles.support,
				type: 'role',
				allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ATTACH_FILES, Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.USE_EXTERNAL_EMOJIS, Permissions.FLAGS.USE_EXTERNAL_STICKERS]
			},
			{
				id: client.config.roles.admin,
				type: 'role',
				allow: [
					Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.SEND_MESSAGES,
					Permissions.FLAGS.ATTACH_FILES,
					Permissions.FLAGS.EMBED_LINKS,
					Permissions.FLAGS.ADD_REACTIONS,
					Permissions.FLAGS.READ_MESSAGE_HISTORY,
					Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
					Permissions.FLAGS.USE_EXTERNAL_STICKERS,
					Permissions.FLAGS.MANAGE_MESSAGES,
					Permissions.FLAGS.MENTION_EVERYONE
				]
			},
			{
				id: interaction.user.id,
				type: 'member',
				allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ATTACH_FILES, Permissions.FLAGS.EMBED_LINKS, Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.USE_EXTERNAL_EMOJIS, Permissions.FLAGS.USE_EXTERNAL_STICKERS]
			},
			{
				id: interaction.guild.roles.everyone,
				deny: [Permissions.FLAGS.VIEW_CHANNEL]
			}
		]
	});
	let embed = new MessageEmbed({
		title: `${interaction.options.get('department').value.toString().replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General')} Support - New Ticket`,
		color: '#1AB6DC',
		thumbnail: { url: interaction.user.avatarURL() },
		description: `**ID:** ${id}
		**Member:** ${interaction.user.tag} (<@!${interaction.user.id}>)
		**Verified:** ${interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(client.config.roles.verified) ? 'Yes' : 'No'}
		**Joined:** ${interaction.guild.members.cache.get(interaction.user.id).joinedAt.toDateString()}
		**Created:** ${interaction.guild.members.cache.get(interaction.user.id).user.createdAt.toDateString()}`,
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	const closeButton: MessageButton = new MessageButton({ customId: 'btn.ticket.close', label: 'Close', emoji: '🔒', style: 'DANGER' });
	const actionRow = new MessageActionRow({ components: [closeButton] });
	await ticket.create({ guild: interaction.guild.id, user: interaction.user.id, channel: ch.id, ticketID: id, status: 'open', department: interaction.options.getString('department') });
	await interaction.reply({ content: `Ticket has been created. <#${ch.id}>` });
	ch.send({ content: `<@!${interaction.user.id}>` }).then(async (msg) => await msg.delete());
	ch.send({ embeds: [embed], components: [actionRow] }).then((msg) => msg.pin());
};

export const info: CommandInfo = {
	name: 'open',
	category: 'tickets',
	description: 'Opens a support ticket.',
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
