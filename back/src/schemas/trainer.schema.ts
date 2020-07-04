import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Box } from './box.schema';
import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

// export const TrainerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   boxes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'box' }]
// })

// export interface Trainer extends mongoose.Document {
//   id: string;
//   boxes: Box[];
//   name: string;
//   username: string;
//   password: string;
// }


@Schema()
export class Trainer extends mongoose.Document{
    @Prop()
    id: string;

    @Prop( [{ type: mongoose.Schema.Types.ObjectId, ref: 'box' }])
    boxes: Box[];

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer)