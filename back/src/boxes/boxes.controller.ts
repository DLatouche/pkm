import { Controller, Get } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { Box } from 'src/schemas/box.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('boxes')
@Controller('boxes')
export class BoxesController {

    constructor(private boxesService: BoxesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all boxes' })
    @ApiResponse({ status: 201, description: 'All boxes.' })
    async getAll(): Promise<Box[]> {
        return await this.boxesService.findAll();
    }


}
