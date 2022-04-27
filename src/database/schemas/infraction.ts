import { InfractionInterface } from '@/interfaces/schemas/Infraction';
import { Schema, SchemaTypes, model } from 'mongoose';

const InfractionSchema: Schema = new Schema({
    infID: {
        type: SchemaTypes.Number,
        required: true
    },
    guild: {
        type: SchemaTypes.String,
        required: true
    },
    type: {
        type: SchemaTypes.String,
        required: true
    },
    user: {
        type: SchemaTypes.String,
        required: true
    },
    details: {
        reason: {
            type: SchemaTypes.String,
            required: true
        },
        moderator: {
            type: SchemaTypes.String,
            required: true
        },
        duration: {
            type: SchemaTypes.String,
            required: false
        }
    }
});

export default model<InfractionInterface>('infractions', InfractionSchema);