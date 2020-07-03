import { TrainersService } from './trainers.service';
import { Trainer } from 'src/schemas/trainer.schema';
export declare class TrainersController {
    private trainersService;
    constructor(trainersService: TrainersService);
    create(name: string, username: string, password: string): Promise<Trainer>;
    findAll(): Promise<Trainer[]>;
    findById(id: string): Promise<Trainer>;
    addBox(id: string, boxName: string): Promise<Trainer>;
}
