import ticket from '@/database/schemas/ticket';
import messageLog from '@/database/schemas/messageLog';
import MessageLogInterface from '@/interfaces/schemas/MessageLog';
import { ButtonInteraction, CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { writeFileSync } from 'fs';
import transcript from '@/database/schemas/transcript';
import Client from '@/Client';

export default async (client: Client, interaction: CommandInteraction | ButtonInteraction) => {
	const messages: string[] = Array();
	const ticketData = await ticket.findOne({ channel: interaction.channel.id, guild: interaction.guild.id });
	const messageLogs = await messageLog.find({ channel: interaction.channel.id, guild: interaction.guild.id });
	const ticketID: string = await ticketData.get('ticketID');
	const ticketDep: string = await ticketData.get('department');
	messageLogs.forEach((trans: MessageLogInterface) => messages.push(`${trans.author}: ${trans.message}`));
	await writeFileSync(`./transcripts/trans-${ticketID}.txt`, messages.join('\r\n'));
	await transcript.create({ guild: interaction.guild.id, transcript: messages, ticketID: ticketID });
	await ticket.updateOne({ channel: interaction.channel.id, guild: interaction.guild.id }, { status: 'closed' });
	await messageLog.deleteMany({ guild: interaction.guild.id, channel: interaction.channel.id });
	await interaction.followUp({ content: 'Ticket will close in 10 seconds.', ephemeral: false });
	await interaction.channel.send({ content: 'Transcript:', files: [`./transcripts/trans-${ticketID}.txt`] });
	setTimeout(async () => {
		await interaction.channel.delete();
	}, 10000);
	let embed = new MessageEmbed({
		title: `Ticket Transcript | ${ticketID}`,
		thumbnail: { url: interaction.user.avatarURL() },
		color: '#32B913',
		fields: [
			{
				name: 'Department:',
				value: ticketDep.replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General'),
				inline: true
			},
			{
				name: 'Verified:',
				value: interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(client.config.roles.verified) ? 'Yes' : 'No',
				inline: true
			},
			{
				name: 'Member:',
				value: `${interaction.user.tag} (${interaction.user.id})`,
				inline: false
			}
		],
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	client.log('transcripts', { embeds: [embed], files: [`./transcripts/trans-${ticketID}.txt`] });
};
