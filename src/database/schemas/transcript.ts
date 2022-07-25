import { Schema, SchemaTypes, model } from 'mongoose';
import TranscriptInterface from '@/interfaces/schemas/Transcript';

const TranscriptSchema: Schema = new Schema({
	guild: {
		type: SchemaTypes.String,
		required: true
	},
	transcript: {
		type: SchemaTypes.Array,
		required: true
	},
	ticketID: {
		type: SchemaTypes.Number,
		required: true
	}
});

export default model<TranscriptInterface>('transcripts', TranscriptSchema);
