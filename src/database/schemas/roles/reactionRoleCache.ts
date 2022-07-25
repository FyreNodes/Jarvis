import ReactionRoleCacheInterface from '@/interfaces/schemas/roles/ReactionRoleCache';
import { Schema, SchemaTypes, model } from 'mongoose';

const ReactionRoleCacheSchema: Schema = new Schema({
	guild: {
		type: SchemaTypes.String,
		required: true
	},
	channel: {
		type: SchemaTypes.String,
		required: true
	},
	int: {
		type: SchemaTypes.String,
		required: true
	},
	data: {
		type: SchemaTypes.Number,
		required: true
	}
});

export default model<ReactionRoleCacheInterface>('reactionRoleCache', ReactionRoleCacheSchema);
