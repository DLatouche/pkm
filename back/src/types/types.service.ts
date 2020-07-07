import { Injectable, ForbiddenException } from '@nestjs/common';
import { TypeSchema, Type } from '../schemas/type.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class TypesService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("type") private readonly typeModel: Model<Type>) { }

    async create(name: string): Promise<Type> {
        const getType = await this.typeModel.findOne({ name: name });
        if(getType == null){
            const createdType = new this.typeModel({ name: name });
            return createdType.save();
        }else{
            throw new ForbiddenException('Type already exist');
        }
    }

    async findAll(): Promise<Type[]> {
        return await this.typeModel.find();
    }

    async findById(id: string): Promise<Type>{
        return await this.typeModel.findById(id);
    }
}
