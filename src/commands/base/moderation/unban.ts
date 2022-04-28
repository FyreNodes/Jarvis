import { CommandInfo, CommandRun } from "@/Interfaces";

export const run: CommandRun = async (client, message, args) => {
    try {
        await message.guild.members.unban(args[0], `Moderator: ${message.author.tag}`);
    } catch (error) {
        return message.reply({ content: 'The specified user is not banned!' });
    };
    message.channel.send({ content: 'Successfully unbanned user.' });
};

export const info: CommandInfo = {
    name: 'unban',
    category: 'moderation',
    permissions: ["MANAGE_GUILD"]
};