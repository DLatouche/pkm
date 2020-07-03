import { TrainersService } from './trainers.service';
import { Trainer } from 'src/schemas/trainer.schema';
import { Box } from 'src/schemas/box.schema';
import { Pokemon } from 'src/schemas/pokemon.schema';
export declare class TrainersController {
    private trainersService;
    constructor(trainersService: TrainersService);
    create(name: string, username: string, password: string): Promise<Trainer>;
    findAll(): Promise<Trainer[]>;
    findById(id: string): Promise<Trainer>;
    addBox(id: string, boxName: string): Promise<Trainer>;
    getAllBoxes(id: string): Promise<Box[]>;
    getBox(id: string, idBox: string): Promise<Box>;
    addPokemon(id: string, idBox: string, name: string, firstType: string, secondType: string): Promise<Pokemon>;
}
