import { TrainersService } from './trainers.service';
import { Trainer } from 'src/schemas/trainer.schema';
import { Box } from 'src/schemas/box.schema';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { BoxesService } from 'src/boxes/boxes.service';
import { PokemonsService } from 'src/pokemons/pokemons.service';
import { CreateTrainerDto } from './dto/createTrainer.dto';
export declare class TrainersController {
    private trainersService;
    private boxesService;
    private pokemonsService;
    constructor(trainersService: TrainersService, boxesService: BoxesService, pokemonsService: PokemonsService);
    create(createTrainerDto: CreateTrainerDto): Promise<Trainer>;
    findAll(): Promise<Trainer[]>;
    findById(id: string): Promise<Trainer>;
    addBox(id: string, boxName: string): Promise<Trainer>;
    getAllBoxes(id: string): Promise<Box[]>;
    getBox(id: string, idBox: string): Promise<Box>;
    deleteBox(id: string, idBox: string): Promise<string>;
    addPokemon(trainerId: string, boxId: string, name: string, firstType: string, secondType: string): Promise<Pokemon>;
    move(id: string, pokemonId: string, fromBoxId: string, toBoxId: string): Promise<Pokemon>;
}
