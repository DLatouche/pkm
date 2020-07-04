import { Controller, Get } from '@nestjs/common';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { PokemonsService } from './pokemons.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {

    constructor(private pokemonsService: PokemonsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all pokemons.' })
    @ApiResponse({ status: 201, description: 'Array of pokemon.' })
    
    async getAll(): Promise<Pokemon[]> {
        return await this.pokemonsService.findAll();
    }


}
