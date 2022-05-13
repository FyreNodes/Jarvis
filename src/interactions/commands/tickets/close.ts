import ticket from '@/database/schemas/ticket';
import transcript from '@/database/schemas/transcript';
import { InteractionInfo, InteractionRun } from '@/Interfaces';
import { TranscriptInterface } from '@/interfaces/schemas/Transcript';
import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { writeFileSync } from 'fs';

export const run: InteractionRun = async (client, interaction: CommandInteraction) => {
	if (!(await ticket.exists({ channel: interaction.channel.id }))) return interaction.reply({ content: 'This is not a ticket.', ephemeral: true });
	await interaction.reply({ content: 'Closing ticket...' });
	const transcriptsArr = Array();
	const ticketData = await ticket.findOne({ channel: interaction.channel.id, guild: interaction.guild.id });
	const transcripts = await transcript.find({ channel: interaction.channel.id, guild: interaction.guild.id });
	const ticketID: string = await ticketData.get('ticketID');
	transcripts.forEach((trans: TranscriptInterface) => transcriptsArr.push(`${trans.author}: ${trans.message}`));
	await writeFileSync(`./transcripts/trans-${ticketID}.txt`, transcriptsArr.join('\r\n'));
	await ticket.deleteOne({ channel: interaction.channel.id, guild: interaction.guild.id });
	await ticket.updateOne({ channel: interaction.channel.id, guild: interaction.guild.id, status: 'closed' });
	await interaction.followUp({ content: 'Transcript:', files: [`./transcripts/trans-${ticketID}.txt`] });
	await interaction.editReply({ content: 'Ticket will close in 10 seconds.' });
	setTimeout(async () => {
		await interaction.channel.delete();
	}, 10000);
	let embed = new MessageEmbed({
		title: `Ticket Transcript | ${ticketID}`,
		thumbnail: { url: interaction.user.avatarURL() },
		color: '#32B913',
		fields: [
			{
				name: 'Member:',
				value: `${interaction.user.tag} (<@${interaction.user.id}>)`,
				inline: true
			},
			{
				name: 'Verified:',
				value: interaction.guild.members.cache.get(interaction.user.id).roles.cache.has('970815386712936448') ? 'Yes' : 'No',
				inline: true
			}
		],
		footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
		timestamp: Date.now()
	});
	await (interaction.guild.channels.cache.get('974552895489990736') as TextChannel).send({ embeds: [embed], files: [`./transcripts/trans-${ticketID}.txt`] });
};

export const info: InteractionInfo = {
	name: 'close',
	category: 'tickets',
	description: 'Close a support ticket.',
	intType: 'command',
	type: 1
};
