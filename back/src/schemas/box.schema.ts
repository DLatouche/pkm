import * as mongoose from 'mongoose';
import { Pokemon } from './pokemon.schema';

export const BoxSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' }]

})

export interface Box extends mongoose.Document {
    id: string;
    name: string;
    pokemons: Pokemon[];
}
