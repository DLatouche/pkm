import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

// export const TypeSchema = new mongoose.Schema({
//     name: { type: String, required: true }
// })

// export interface Type extends mongoose.Document {
//     id: string;
//     name: string;
// }

@Schema()
export class Type extends mongoose.Document{
    @Prop()
    id: string;

    @Prop({required: true})
    name: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type)