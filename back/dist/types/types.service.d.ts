import { Type } from 'src/schemas/type.schema';
import { Connection, Model } from 'mongoose';
export declare class TypesService {
    private connection;
    private readonly typeModel;
    constructor(connection: Connection, typeModel: Model<Type>);
    create(name: string): Promise<Type>;
    findAll(): Promise<Type[]>;
}
