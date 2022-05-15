import { Schema, SchemaTypes, model } from 'mongoose';
import { ConfigInterface } from '@/interfaces/schemas/Config';

const ConfigSchema: Schema = new Schema({
	botID: {
		type: SchemaTypes.String,
		required: true
	},
	guildID: {
		type: SchemaTypes.String,
		required: true
	},
	prefix: {
		type: SchemaTypes.String,
		required: true
	},
	status: {
		type: {
			type: SchemaTypes.String,
			required: false
		},
		activity: {
			type: {
				type: SchemaTypes.String,
				required: true
			},
			name: {
				type: SchemaTypes.String,
				required: true
			},
			url: {
				type: SchemaTypes.String,
				required: false
			}
		},
	}
});

export default model<ConfigInterface>('botConfig', ConfigSchema);
