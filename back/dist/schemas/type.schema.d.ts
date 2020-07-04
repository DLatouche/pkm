import * as mongoose from 'mongoose';
export declare class Type extends mongoose.Document {
    id: string;
    name: string;
}
export declare const TypeSchema: mongoose.Schema<any>;
