import Client from '@/Client';
import { GuildMember, Interaction, Message } from 'discord.js';
import { grey, green, white } from 'chalk';

import ready from '@/events/ready';
import messageCreate from '@/events/messageCreate';
import interactionCreate from '@/events/interactionCreate';
import guildMemberAdd from '@/events/guildMemberAdd';
import guildMemberUpdate from '@/events/guildMemberUpdate';

export const eventHandler = (client: Client) => {
	client.once('ready', () => ready(client));
	client.on('messageCreate', async (message: Message) => messageCreate(client, message));
	client.on('interactionCreate', async (interaction: Interaction) => interactionCreate(client, interaction));
	client.on('guildMemberAdd', async (member: GuildMember) => guildMemberAdd(client, member));
	client.on('guildMemberUpdate', async (oldMember: GuildMember, newMember: GuildMember) => guildMemberUpdate(client, oldMember, newMember));
	console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All events have been loaded.')}`);
};
