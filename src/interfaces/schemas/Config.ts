import { ExcludeEnum } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

export interface ConfigInterface {
	botID: string;
	guildID: string;
	prefix: string;
	status: {
		type?: ExcludeEnum<typeof ActivityTypes, "CUSTOM">;
		msg?: string;
		url?: string;
	};
}
