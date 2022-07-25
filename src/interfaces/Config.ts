import { ActivityType, PresenceStatusData } from 'discord.js';

export default interface JarvisConfig {
	guild: string;
	staffGuild: string;
	tickets: string;
	themeColor: number;
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
		verified: string;
		member: string;
	};
}

export type PermissionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type LogChannel = 'moderation' | 'transcripts';
export type GuildLockResolveable = 'main' | 'staff';
