import Client from '@/Client';
import messageCreate from '@/events/messageCreate';
import ready from '@/events/ready';
import interactionCreate from '@/events/interactionCreate';
import { GuildMember, Interaction, Message } from 'discord.js';
import { grey, green, white } from 'chalk';
import guildMemberAdd from '@/events/guildMemberAdd';

export const eventHandler = (client: Client) => {
	client.once('ready', () => ready(client));
	client.on('messageCreate', async (message: Message) => messageCreate(client, message));
	client.on('interactionCreate', async (interaction: Interaction) => interactionCreate(client, interaction));
	client.on('guildMemberAdd', async (member: GuildMember) => guildMemberAdd(member));
	console.log(`${grey.bold('[')}${green.bold('HANDLER')}${grey.bold(']')} ${white('All events have been loaded.')}`);
};
