import { Schema, SchemaTypes, model } from 'mongoose';
import PermissionInterface from '@/interfaces/schemas/Permission';

const PermissionSchema: Schema = new Schema({
    user: {
        type: SchemaTypes.String,
        required: true
    },
    level: {
        type: SchemaTypes.Number,
        required: true
    }
});

export default model<PermissionInterface>('permissions', PermissionSchema);