import TagInterface from '@/interfaces/schemas/Tag';
import { Schema, SchemaTypes, model } from 'mongoose';

const TagSchema: Schema = new Schema({
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
    content: {
        type: SchemaTypes.String,
        required: true
    }
});

export default model<TagInterface>('tags', TagSchema);