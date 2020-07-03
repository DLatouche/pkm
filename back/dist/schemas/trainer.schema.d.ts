import * as mongoose from 'mongoose';
import { Box } from './box.schema';
export declare const TrainerSchema: mongoose.Schema<any>;
export interface Trainer extends mongoose.Document {
    id: string;
    boxes: Box[];
    name: string;
    username: string;
    password: string;
}
