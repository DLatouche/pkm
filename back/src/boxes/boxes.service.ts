import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Box } from 'src/schemas/box.schema';
import { Type } from 'src/schemas/type.schema';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { type } from 'os';

@Injectable()
export class BoxesService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("box") private readonly boxModel: Model<Box>) { }

    async create(name: string): Promise<Box> {
        const createdBox = new this.boxModel({ name: name });
        return createdBox.save();
    }

    async findAll(): Promise<Box[]> {
        return await this.boxModel.find().populate("pokemons");
    }

    async getSize(id: string): Promise<number> {
        return await (await this.boxModel.findById(id)).pokemons.length;
    }

    async getType(id: string): Promise<string[]> {
        let types: string[] = [];
        const box = await this.boxModel.findById(id).populate("pokemons");
        box.pokemons.forEach((pkm) => {
            if(pkm.firstType?.[0]?._id && !types.includes(pkm.firstType[0]._id.toString())) types.push(pkm.firstType[0]._id.toString())
            if(pkm.secondType?.[0]?._id && !types.includes(pkm.secondType[0]._id.toString())) types.push(pkm.secondType[0]._id.toString())
        })
        return types;
    }
}
