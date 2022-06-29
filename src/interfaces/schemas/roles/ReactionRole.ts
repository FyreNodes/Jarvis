import { EmojiIdentifierResolvable } from "discord.js";

export default interface ReactionRole {
	id: number;
	guild: string;
	group: number;
	name: string;
	description: string;
	emoji?: EmojiIdentifierResolvable;
	role: string;
}
