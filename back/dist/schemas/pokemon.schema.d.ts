import * as mongoose from 'mongoose';
import { Type } from './type.schema';
import { Trainer } from './trainer.schema';
export declare class Pokemon extends mongoose.Document {
    id: string;
    name: string;
    firstType: Type;
    secondType: Type;
    trainer: Trainer;
}
export declare const PokemonSchema: mongoose.Schema<any>;
