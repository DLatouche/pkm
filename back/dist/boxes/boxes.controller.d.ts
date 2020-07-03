import { BoxesService } from './boxes.service';
import { Box } from 'src/schemas/box.schema';
export declare class BoxesController {
    private boxesService;
    constructor(boxesService: BoxesService);
    getAll(): Promise<Box[]>;
}
