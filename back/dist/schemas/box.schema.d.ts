import * as mongoose from 'mongoose';
export declare const BoxSchema: mongoose.Schema<any>;
export interface Box extends mongoose.Document {
    id: string;
    name: string;
}
