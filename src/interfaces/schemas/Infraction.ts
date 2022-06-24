export default interface Infraction {
	infID: number;
	guild: string;
	type: string;
	user: string;
	details: {
		reason: string;
		moderator: string;
		duration?: string;
	};
}
