import { ExcludeEnum, PresenceStatusData } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

export default interface ConfigInterface {
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
