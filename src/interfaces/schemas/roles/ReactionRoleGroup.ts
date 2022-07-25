import { ColorResolvable } from 'discord.js';

export default interface ReactionRoleGroup {
	id: number;
	guild: string;
	name: string;
	description: string;
	image?: string;
	color?: ColorResolvable;
}
