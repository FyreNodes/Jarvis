import { Schema, SchemaTypes, model } from 'mongoose';
import { ConfigInterface } from '@/interfaces/schemas/Config';

const ConfigSchema: Schema = new Schema({
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
			required: true
		},
		msg: {
			type: SchemaTypes.String,
			required: true
		},
		url: {
			type: SchemaTypes.String,
			required: false
		}
	}
});

export default model<ConfigInterface>('botConfig', ConfigSchema);
