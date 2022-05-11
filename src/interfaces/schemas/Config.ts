export interface ConfigInterface {
	botID: string;
	guildID: string;
	prefix: string;
	status: {
		type?: string;
		msg?: string;
		url?: string;
	};
}
