export default interface TicketInterface {
	ticketID: number;
	guild: string;
	user: string;
	channel: string;
	status: 'open' | 'closed';
	department: string;
}
