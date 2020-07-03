import * as mongoose from 'mongoose';
import { Pokemon } from './pokemon.schema';
export declare const BoxSchema: mongoose.Schema<any>;
export interface Box extends mongoose.Document {
    id: string;
    name: string;
    pokemons: Pokemon[];
}
