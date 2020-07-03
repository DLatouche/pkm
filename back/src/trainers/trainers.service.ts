import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BoxesService } from 'src/boxes/boxes.service';
import { Trainer } from 'src/schemas/trainer.schema';
import { Box } from 'src/schemas/box.schema';

@Injectable()
export class TrainersService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("trainer") private readonly trainerModel: Model<Trainer>, private boxesService: BoxesService) { }

    async create(name: string, username: string, password: string): Promise<Trainer> {
        const createdTrainer = new this.trainerModel({ name: name, username: username, password: password });
        return createdTrainer.save();
    }

    async findAll(): Promise<Trainer[]> {
        return await this.trainerModel.find().populate("boxes");
    }

    async addBox(id: string, name: string): Promise<Trainer> {
        let trainer: Trainer;
        try {
            trainer = await this.trainerModel.findById(id).exec();
            if (!trainer) {
                throw new NotFoundException('Could not find trainer.');
            } else {
                let box: Box = await this.boxesService.create(name);
                box = await box.save();
                await trainer.boxes.push(box);
                trainer = await trainer.save();
            }
        } catch (error) {
            throw new NotFoundException('Could not find trainer.');
        }
        return trainer;
    }

    async findById(id: string): Promise<Trainer> {
        return await this.trainerModel.findById(id).populate("boxes");
    }
}
