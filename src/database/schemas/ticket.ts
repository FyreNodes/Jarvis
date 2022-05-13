import { TicketInterface } from '@/interfaces/schemas/Ticket';
import { Schema, SchemaTypes, model } from 'mongoose';

const TicketSchema: Schema = new Schema({
	ticketID: {
		type: SchemaTypes.Number,
		required: true
	},
	guild: {
		type: SchemaTypes.String,
		required: true
	},
	user: {
		type: SchemaTypes.String,
		required: true
	},
	channel: {
		type: SchemaTypes.String,
		required: true
	},
	status: {
		type: SchemaTypes.String,
		required: true
	}
});

export default model<TicketInterface>('tickets', TicketSchema);
