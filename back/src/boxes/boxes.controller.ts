import { Controller, Get, Delete, Param } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { Box } from 'src/schemas/box.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Pokemon } from 'src/schemas/pokemon.schema';

@ApiTags('boxes')
@Controller('boxes')
export class BoxesController {

    constructor(private boxesService: BoxesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all boxes.' })
    @ApiResponse({ status: 201, description: 'All boxes.' })
    async getAll(): Promise<Box[]> {
        return await this.boxesService.findAll();
    }

    @Delete(":id/remove/:pokemonId")
    @ApiOperation({ summary: 'Delete one pokemon on one boxes' })
    @ApiResponse({ status: 201, description: 'Return object with data of query.' })
    async deletePokemon(@Param('id') id: string, @Param('pokemonId') pokemonId: string): Promise<Object> {
        console.log('boxes.controller.ts -> 24: pokemonId', pokemonId)
        return await this.boxesService.deletePokemon(id, pokemonId);
    }


}
