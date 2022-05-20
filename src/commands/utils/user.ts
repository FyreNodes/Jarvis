import { CommandInfo, CommandRun } from "@/Interfaces";
import getUser from "@/utils/getUser";
import { Activity, Collection, GuildMember, Message, MessageEmbed, Permissions, Presence, PresenceStatus, Role } from "discord.js";
import dayjs from "dayjs";
import Client from "@/Client";

export const run: CommandRun = async (client, message, args) => {
    const member = await getUser(message, message.mentions.users.first() || args[0] || message.author);
    console.log(member.presence.activities[0]);
    const embed = new MessageEmbed({
        author: { name: `User Info - ${member.user.tag}`, iconURL: member.user.avatarURL() },
        thumbnail: { url: member.user.avatarURL() },
        color: '#1AB6DC',
        fields: [
            { name: 'ID:', value: member.user.id, inline: true },
            { name: 'Status:', value: getStatus(member.presence), inline: true },
            { name: 'Activity:', value: getActivity(member.presence), inline: true },
            { name: 'Nickname:', value: member.nickname ? member.nickname : 'None', inline: true },
            { name: 'Message:', value: getMessage(member.presence), inline: true },
            { name: 'Joined:', value: `${dayjs(member.joinedTimestamp).tz('America/New_York').format('dddd, MMMM Do, YYYY h:mm A (DD/MM/YYYY)')} (EST/EDT)`, inline: false },
            { name: 'Created:', value: `${dayjs(member.user.createdTimestamp).tz('America/New_York').format('dddd, MMMM Do, YYYY h:mm A (DD/MM/YYYY)')} (EST/EDT)`, inline: false },
            { name: 'Roles:', value: getRoles(member.roles.cache, message).map(r => {return `<@&${r.id}>`}).join(', ') },
            { name: 'Acknowledgements:', value: getAcknowledgements(client, member), inline: false }
        ],
        footer: { text: 'Jarvis Utility', iconURL: client.user.avatarURL() },
        timestamp: Date.now()
    });
    message.channel.send({ embeds: [embed] });
};

export const info: CommandInfo = {
    name: 'user',
    category: 'utility'
};

function getStatus(presence: Presence): string {
    let formattedStatus: string = null;
    if (!presence) return formattedStatus = 'Invisible / Offline';
    const statusData = { online: 'Online / Active', idle: 'Idle / Away', dnd: 'Do Not Disturb / Busy', invisible: 'Invisible / Hidden', offline: 'Offline' };
    const queryData = new RegExp(Object.keys(statusData).join('|'));
    presence.status.replace(queryData, function(matchedData) {return formattedStatus = statusData[matchedData]});
    return formattedStatus;
};

function getActivity(presence: Presence): string {
    let formattedActivity: string = null;
    if (!presence) formattedActivity = 'Offline';
    const activityData = ['PLAYING', 'LISTENING', 'STREAMING'];
    const res = presence.activities.filter(x => activityData.includes(x.type))[0];
    if (!res) formattedActivity = 'None';
    switch (res.type) {
        case 'PLAYING':
            formattedActivity = `Playing ${res.name}`;
        break;

        case 'LISTENING':
            formattedActivity = 'Listing to Spotify';
        break;

        case 'STREAMING':
            formattedActivity = `Streaming [${res.name}](${res.url})`;
        break;
    };
    return formattedActivity;
};

function getMessage(presence: Presence): string {
    if (!presence) return 'Offline';
    if (presence.activities[0].type !== 'CUSTOM') return 'None';
    return `${presence.activities[0].emoji.name} ${presence.activities[0].state}`;
}

function getRoles(roles: Collection<string, Role>, message: Message): Collection<string, Role> {
    roles.delete(message.guild.roles.everyone.id);
    return roles.sort((r1, r2) => (r1.position !== r2.position) ? r2.position - r1.position : parseInt(r1.id) - parseInt(r2.id));
};

function getAcknowledgements(client: Client, member: GuildMember): string {
    const acknowledgements: string[] = Array();
    if (client.isDeveloper(member.user)) acknowledgements.push('Jarvis Creator');
    if (member.user.id === member.guild.ownerId) acknowledgements.push('Server Owner');
    if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) acknowledgements.push('Server Admin');
    if (member.permissions.has(Permissions.FLAGS.MANAGE_GUILD, false)) acknowledgements.push('Server Manager');
    if (member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS, false)) acknowledgements.push('Server Moderator');
    return acknowledgements.length ? acknowledgements.join(', ') : 'None';
};