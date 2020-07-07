import { Pokemon } from '../schemas/pokemon.schema';
import { PokemonsService } from './pokemons.service';
export declare class PokemonsController {
    private pokemonsService;
    constructor(pokemonsService: PokemonsService);
    getAll(): Promise<Pokemon[]>;
}
