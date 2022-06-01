import { ExcludeEnum, PresenceStatusData } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

export interface JarvisConfig {
	guild: string;
	staffGuild: string;
	perms: UserPerms[];
	tickets: string;
	channels: {
		welcome: string;
		logs: {
			moderation: string;
			transcripts: string;
		};
	};
	roles: {
		admin: string;
		support: string;
	}
	presence: {
		status: PresenceStatusData;
		activity: {
			type: ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>;
			name: string;
			url?: string;
		}
	}
}

export interface UserPerms {
	id: string;
	level?: PermissionLevel;
}

export type PermissionLevel = 0|1|2|3|4|5|6|7|8|9;
export type LogChannel = 'moderation'|'transcripts';
