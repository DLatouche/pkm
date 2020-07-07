import { Connection, Model } from 'mongoose';
import { BoxesService } from '../boxes/boxes.service';
import { Trainer } from '../schemas/trainer.schema';
import { Box } from '../schemas/box.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { TypesService } from '../types/types.service';
import { Pokemon } from '../schemas/pokemon.schema';
export declare class TrainersService {
    private connection;
    private readonly trainerModel;
    private boxesService;
    private pokemonsService;
    private typesService;
    constructor(connection: Connection, trainerModel: Model<Trainer>, boxesService: BoxesService, pokemonsService: PokemonsService, typesService: TypesService);
    create(name: string, username: string, password: string): Promise<Trainer>;
    findAll(): Promise<Trainer[]>;
    findByUsername(username: string): Promise<Trainer>;
    addBox(id: string, name: string): Promise<Trainer>;
    findById(id: string): Promise<Trainer>;
    findAllBoxes(id: string): Promise<Box[]>;
    findOneBox(trainerId: string, boxId: string): Promise<Box>;
    addPokemon(trainerId: string, boxId: string, name: string, firstTypeId: string, secondTypeId: string): Promise<Pokemon>;
}
