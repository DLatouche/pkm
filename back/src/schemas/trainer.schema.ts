import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Box } from './box.schema';

export const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  boxes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'box' }]
})

export interface Trainer extends mongoose.Document {
  id: string;
  boxes: Box[];
  name: string;
  username: string;
  password: string;
}
