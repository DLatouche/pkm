import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { Trainer } from '../schemas/trainer.schema';
import { Type } from '../schemas/type.schema';

@Injectable()
export class PokemonsService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("pokemon") private readonly pokemonModel: Model<Pokemon>) { }

    async create(name: string, types: Type[], trainer: Trainer): Promise<Pokemon> {
        const createdPokemon = new this.pokemonModel({ name: name });
        createdPokemon.firstType = types[0];
        if (types.length > 1) createdPokemon.secondType = types[1];
        createdPokemon.trainer = trainer;
        return createdPokemon.save();
    }

    async findAll(): Promise<Pokemon[]> {
        return await this.pokemonModel.find().populate("trainer").populate("firstType").populate("secondType");
    }

    async findById(id: string): Promise<Pokemon> {
        return await this.pokemonModel.findById(id);
    }
}
