import { BoxesService } from './boxes.service';
import { Box } from '../schemas/box.schema';
export declare class BoxesController {
    private boxesService;
    constructor(boxesService: BoxesService);
    getAll(): Promise<Box[]>;
    deletePokemon(id: string, pokemonId: string): Promise<Object>;
}
