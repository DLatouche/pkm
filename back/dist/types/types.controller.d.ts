import { TypesService } from './types.service';
import { Type } from 'src/schemas/type.schema';
export declare class TypesController {
    private typesService;
    constructor(typesService: TypesService);
    create(name: string): Promise<Type>;
    findAll(): Promise<Type[]>;
}
