import { Schema, SchemaTypes, model } from 'mongoose';
import { MessageLogInterface } from '@/interfaces/schemas/MessageLog';

const MessageLogSchema: Schema = new Schema({
	guild: {
		type: SchemaTypes.String,
		required: true
	},
	message: {
		type: SchemaTypes.String,
		required: true
	},
	channel: {
		type: SchemaTypes.String,
		required: true
	},
	author: {
		type: SchemaTypes.String,
		required: true
	},
	messageID: {
		type: SchemaTypes.String,
		required: false
	}
});

export default model<MessageLogInterface>('messageLogs', MessageLogSchema);
