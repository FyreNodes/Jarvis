/*import ticket from "@/database/schemas/ticket";
import { CommandInfo, CommandRun } from "@/Interfaces";
import getUser from "@/utils/getUser";
import { MessageEmbed } from "discord.js";

export const run: CommandRun = async (client, message, args) => {
    const member = await getUser(message, message.mentions.users.first() || args[0] || message.author);
    const tickets = await ticket.find({ guild: message.guild.id, user: member.user.id });
    if (!tickets.length) return message.channel.send({ content: 'The specified user has no ticket history.' });
    let embed = new MessageEmbed({
        author: { name: `Ticket History | ${member.user.tag}`, iconURL: member.user.avatarURL() },
        thumbnail: { url: member.user.avatarURL() },
        color: '#1AB6DC',
        description: tickets.map((data) => {return `**ID:** ${data.ticketID} | **Department:** ${data.department.replace('billing', 'Billing').replace('tech', 'Technical').replace('general', 'General')}`}).join('\n'),
        footer: { text: 'Jarvis Tickets', iconURL: client.user.avatarURL() },
        timestamp: Date.now()
    });
    message.channel.send({ embeds: [embed] });
};

export const info: CommandInfo = {
    name: 'history',
    category: 'moderation',
    permissions: ["MANAGE_MESSAGES"]
};*/