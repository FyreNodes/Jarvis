import { ExcludeEnum, PresenceStatusData } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

export interface ConfigInterface {
	botID: string;
	guildID: string;
	prefix: string;
	status: {
		type: PresenceStatusData;
		activity: {
			type?: ExcludeEnum<typeof ActivityTypes, "CUSTOM">;
			name?: string;
			url?: string;
		}
	};
}
