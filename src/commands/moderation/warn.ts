import infraction from "@/database/schemas/infraction";
import { CommandInfo, CommandRun } from "@/Interfaces";
import gen from "@/utils/gen";
import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";

export const run: CommandRun = async (client, interaction: CommandInteraction) => {
    const infID: number = await gen('id', 6);
    let userEmbed = new MessageEmbed({
		title: 'You have been warned in FyreNodes.',
		thumbnail: { url: interaction.guild.iconURL() },
		color: '#FAF333',
		description: `**ID:** ${infID}\n**Reason:** ${interaction.options.getString('reason')}\n${interaction.options.getBoolean('anonymous') ? '' : `**Moderator:** ${interaction.user.tag} (<@${interaction.user.id}>)`}`,
		footer: { text: 'Jarvis Moderation', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
    let logsEmbed = new MessageEmbed({
		author: { name: `Infraction | Warn | ${infID}`, iconURL: interaction.options.getUser('member').avatarURL() },
		color: '#FAF333',
		fields: [
			{
				name: 'User:',
				value: `${interaction.options.getUser('member').tag} (<@${interaction.options.getUser('member').id}>)`,
				inline: true
			},
			{
				name: 'Moderator:',
				value: `${interaction.user.tag} (<@${interaction.user.id}>)`,
				inline: true
			},
			{ name: 'Reason:', value: interaction.options.getString('reason'), inline: false }
		],
		footer: { text: 'Jarvis Moderation', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
    await infraction.create({ infID: infID, guild: interaction.guild.id, type: 'Warn', user: interaction.options.getUser('member').id, details: { reason: interaction.options.getString('reason'), moderator: interaction.user.id }});
    await interaction.options.getUser('member').send({ embeds: [userEmbed] }).catch(() => {});
    await (interaction.guild.channels.cache.get('968665856919888002') as TextChannel).send({ embeds: [logsEmbed] });
    await interaction.reply({ content: `Successfully warned ${interaction.options.getUser('member').tag}.` });
};

export const info: CommandInfo = {
    name: 'warn',
    category: 'moderation',
    description: 'Warns a member.',
    default_member_permissions: Number(1 << 13),
    dm_permission: false,
    options: [
        {
            type: 6,
            name: 'member',
            description: 'Member to warn',
            required: true
        },
        {
            type: 3,
            name: 'reason',
            description: 'Warning reason',
            required: true
        },
        {
            type: 5,
            name: 'anonymous',
            description: 'Anonymous warning?',
            required: false
        }
    ]
};