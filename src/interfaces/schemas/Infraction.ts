export default interface InfractionInterface {
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
