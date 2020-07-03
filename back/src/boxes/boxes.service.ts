import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Box } from 'src/schemas/box.schema';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class BoxesService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("box") private readonly boxModel: Model<Box>) { }

    async create(name: string): Promise<Box> {
        const createdBox = new this.boxModel({ name: name });
        return createdBox.save();
    }

    async findAll(): Promise<Box[]> {
        return await this.boxModel.find();
    }
}
