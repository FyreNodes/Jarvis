import ReactionRoleInterface from "@/interfaces/schemas/roles/ReactionRole";
import { Schema, SchemaTypes, model } from 'mongoose';

const ReactionRoleSchema: Schema = new Schema({
    id: {
        type: SchemaTypes.Number,
        required: true
    },
    guild: {
        type: SchemaTypes.String,
        required: true
    },
    group: {
        type: SchemaTypes.Number,
        required: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    description: {
        type: SchemaTypes.String,
        required: true
    },
    role: {
        type: SchemaTypes.String,
        required: true
    }
});

export default model<ReactionRoleInterface>('reactionRoles', ReactionRoleSchema);