import { CommandInteraction, GuildMember, Message, User } from 'discord.js';

export default async (message: Message | CommandInteraction, user: any): Promise<GuildMember> => {
	if (message.guild.members.cache.get(user.id)) {
		return message.guild.members.cache.get(user.id);
	} else if (message.guild.members.cache.get(user)) {
		return message.guild.members.cache.get(user);
	} else {
		message.reply({ content: 'Invalid user specified!' });
	}
};
