import Client from '@/Client';
import reactionRoles from '@/lib/reactionRoles';
import { SelectMenuInteraction } from 'discord.js';

export default (client: Client, interaction: SelectMenuInteraction) => {
	reactionRoles(client, interaction);
};
