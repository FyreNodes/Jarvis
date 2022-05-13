import ticket from '@/database/schemas/ticket';
import { InteractionInfo, InteractionRun } from '@/Interfaces';
import gen from '@/utils/gen';
import { CommandInteraction, MessageEmbed, Permissions } from 'discord.js';

export const run: InteractionRun = async (client, interaction: CommandInteraction) => {
	if (await ticket.exists({ guild: interaction.guild.id, user: interaction.user.id, status: 'open' })) return interaction.reply({ content: 'You already have an open ticket.', ephemeral: true });
	const id = await gen('id', 6);
	const ch = await interaction.guild.channels.create(`${interaction.options.get('department').value}-${interaction.user.username}`, {
		type: 'GUILD_TEXT',
		parent: '974147300094009384',
		topic: `${interaction.options.get('department').value.toString().replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General')} Support ticket for ${interaction.user.tag} (${interaction.user.id})`,
		reason: 'Automated Action: Ticket Created',
		position: 1,
		permissionOverwrites: [
			{
				id: '961173678249357336',
				type: 'role',
				allow: [
					Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.SEND_MESSAGES,
					Permissions.FLAGS.ATTACH_FILES,
					Permissions.FLAGS.EMBED_LINKS,
					Permissions.FLAGS.ADD_REACTIONS,
					Permissions.FLAGS.READ_MESSAGE_HISTORY,
					Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
					Permissions.FLAGS.USE_EXTERNAL_STICKERS
				]
			},
			{
				id: '961172814063337523',
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
				allow: [
					Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.SEND_MESSAGES,
					Permissions.FLAGS.ATTACH_FILES,
					Permissions.FLAGS.EMBED_LINKS,
					Permissions.FLAGS.ADD_REACTIONS,
					Permissions.FLAGS.READ_MESSAGE_HISTORY,
					Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
					Permissions.FLAGS.USE_EXTERNAL_STICKERS
				]
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
		**Verified:** ${interaction.guild.members.cache.get(interaction.user.id).roles.cache.has('970815386712936448') ? 'Yes' : 'No'}
		**Joined:** ${interaction.guild.members.cache.get(interaction.user.id).joinedAt.toDateString()}
		**Created:** ${interaction.guild.members.cache.get(interaction.user.id).user.createdAt.toDateString()}`,
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await ticket.create({ guild: interaction.guild.id, user: interaction.user.id, channel: ch.id, ticketID: id, status: 'open' });
	await ch.send({ content: `<@!${interaction.user.id}>` }).then(async (msg) => await msg.delete());
	await ch.send({ embeds: [embed] }).then(async (msg) => await msg.pin());
	interaction.reply({ content: `Ticket has been created. <#${ch.id}>` });
};

export const info: InteractionInfo = {
	name: 'open',
	category: 'tickets',
	description: 'Opens a support ticket.',
	intType: 'command',
	type: 1,
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
