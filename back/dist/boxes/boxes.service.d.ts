import { Connection, Model } from 'mongoose';
import { Box } from 'src/schemas/box.schema';
export declare class BoxesService {
    private connection;
    private readonly boxModel;
    constructor(connection: Connection, boxModel: Model<Box>);
    create(name: string): Promise<Box>;
    findAll(): Promise<Box[]>;
}
