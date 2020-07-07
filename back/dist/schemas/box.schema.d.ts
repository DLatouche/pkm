import * as mongoose from 'mongoose';
import { Pokemon } from './pokemon.schema';
export declare class Box extends mongoose.Document {
    id: string;
    name: string;
    pokemons?: Pokemon[];
}
export declare const BoxSchema: mongoose.Schema<any>;
