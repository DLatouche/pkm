import * as mongoose from 'mongoose';
import { Pokemon } from './pokemon.schema';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

// export const BoxSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' }]

// })

// export interface Box extends mongoose.Document {
//     id: string;
//     name: string;
//     pokemons: Pokemon[];
// }


@Schema()
export class Box extends mongoose.Document {
    @Prop()
    id: string;

    @Prop({required: true})
    name: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' }])
    pokemons: Pokemon[];
}

export const BoxSchema = SchemaFactory.createForClass(Box)