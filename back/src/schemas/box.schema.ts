import * as mongoose from 'mongoose';

export const BoxSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

export interface Box extends mongoose.Document {
    id: string;
    name: string;
}
