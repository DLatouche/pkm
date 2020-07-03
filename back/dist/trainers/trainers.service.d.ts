import { Connection, Model } from 'mongoose';
import { BoxesService } from 'src/boxes/boxes.service';
import { Trainer } from 'src/schemas/trainer.schema';
export declare class TrainersService {
    private connection;
    private readonly trainerModel;
    private boxesService;
    constructor(connection: Connection, trainerModel: Model<Trainer>, boxesService: BoxesService);
    create(name: string, username: string, password: string): Promise<Trainer>;
    findAll(): Promise<Trainer[]>;
    addBox(id: string, name: string): Promise<Trainer>;
    findById(id: string): Promise<Trainer>;
}
