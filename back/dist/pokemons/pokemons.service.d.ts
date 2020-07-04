import { Connection, Model } from 'mongoose';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { Trainer } from 'src/schemas/trainer.schema';
import { Type } from 'src/schemas/type.schema';
export declare class PokemonsService {
    private connection;
    private readonly pokemonModel;
    constructor(connection: Connection, pokemonModel: Model<Pokemon>);
    create(name: string, types: Type[], trainer: Trainer): Promise<Pokemon>;
    findAll(): Promise<Pokemon[]>;
    findById(id: string): Promise<Pokemon>;
}
