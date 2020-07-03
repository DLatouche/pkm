import * as mongoose from 'mongoose';
export declare const TypeSchema: mongoose.Schema<any>;
export interface Type extends mongoose.Document {
    id: string;
    name: string;
}
