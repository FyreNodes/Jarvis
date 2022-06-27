import ReactionRoleGroupInterface from '@/interfaces/schemas/roles/ReactionRoleGroup';
import { Schema, SchemaTypes, model } from 'mongoose';

const ReactionRoleGroupSchema: Schema = new Schema({
	id: {
		type: SchemaTypes.Number,
		required: true
	},
	guild: {
		type: SchemaTypes.String,
		required: true
	},
	name: {
		type: SchemaTypes.String,
		required: true
	},
	description: {
		type: SchemaTypes.String,
		required: true
	}
});

export default model<ReactionRoleGroupInterface>('reactionRoleGroups', ReactionRoleGroupSchema);
