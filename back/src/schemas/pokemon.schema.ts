import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from './type.schema';
import { Trainer } from './trainer.schema';

// export const PokemonSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     firstType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'type' }],
//     secondType: [{ type: mongoose.Schema.Types.ObjectId, ref: 'type' }],
//     trainer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trainer' }]
// })

// export interface Pokemon extends mongoose.Document {
//     id: string;
//     name: string;
//     firstType: Type;
//     secondType: Type;
//     trainer: Trainer;
// }


@Schema()
export class Pokemon extends mongoose.Document {
    @Prop()
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({required: false, type: mongoose.Schema.Types.ObjectId, ref: 'type'})
    firstType?: Type;

    @Prop({required: false, type: mongoose.Schema.Types.ObjectId, ref: 'type' })
    secondType?: Type;

    @Prop({required: false, type: mongoose.Schema.Types.ObjectId, ref: 'trainer' })
    trainer?: Trainer;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)