import * as mongoose from 'mongoose';
import { Box } from './box.schema';
export declare class Trainer extends mongoose.Document {
    id: string;
    boxes?: Box[];
    name: string;
    username: string;
    password: string;
}
export declare const TrainerSchema: mongoose.Schema<any>;
