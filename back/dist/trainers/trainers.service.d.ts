import { Connection, Model } from 'mongoose';
import { BoxesService } from 'src/boxes/boxes.service';
import { Trainer } from 'src/schemas/trainer.schema';
import { Box } from 'src/schemas/box.schema';
import { PokemonsService } from 'src/pokemons/pokemons.service';
import { TypesService } from 'src/types/types.service';
export declare class TrainersService {
    private connection;
    private readonly trainerModel;
    private boxesService;
    private pokemonsService;
    private typesService;
    constructor(connection: Connection, trainerModel: Model<Trainer>, boxesService: BoxesService, pokemonsService: PokemonsService, typesService: TypesService);
    create(name: string, username: string, password: string): Promise<Trainer>;
    findAll(): Promise<Trainer[]>;
    addBox(id: string, name: string): Promise<Trainer>;
    findById(id: string): Promise<Trainer>;
    findAllBoxes(id: string): Promise<Box[]>;
    findOneBox(trainerId: string, boxId: string): Promise<Box>;
    addPokemon(trainerId: string, boxId: string, name: string, firstTypeId: string, secondTypeId: string): Promise<import("../schemas/pokemon.schema").Pokemon>;
}
