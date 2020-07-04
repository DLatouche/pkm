import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { Box } from 'src/schemas/box.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Delete(":id/remove/:pokemonId")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete one pokemon on one box.' })
    @ApiResponse({ status: 200, description: 'Object with number of row who is concerned.' })
    async deletePokemon(@Param('id') id: string, @Param('pokemonId') pokemonId: string): Promise<Object> {
        console.log('boxes.controller.ts -> 24: pokemonId', pokemonId)
        return await this.boxesService.deletePokemon(id, pokemonId);
    }


}
