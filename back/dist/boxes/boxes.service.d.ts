import { Connection, Model } from 'mongoose';
import { Box } from '../schemas/box.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
export declare class BoxesService {
    private connection;
    private readonly boxModel;
    private pokemonsService;
    constructor(connection: Connection, boxModel: Model<Box>, pokemonsService: PokemonsService);
    create(name: string): Promise<Box>;
    findAll(): Promise<Box[]>;
    getSize(id: string): Promise<number>;
    getType(id: string): Promise<string[]>;
    delete(id: string): Promise<void>;
    deletePokemon(idBox: string, idPokemon: string): Promise<Object>;
    addPokemon(idBox: string, idPokemon: string): Promise<Box>;
}
