import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

describe('Pokemon Controller', () => {
  let pokemonsController: PokemonsController;
  let pokemonsService: PokemonsService;


  beforeEach(async () => {
    pokemonsService = { findAll: jest.fn() } as any;
    pokemonsController = new PokemonsController(pokemonsService);
  });


  describe('getAll', () => {
    it('should return an array of pokemon', async () => {
      const result = [{ id: "idPokemon", name: "namePokemon" }];
      (pokemonsService.findAll as any).mockResolvedValue(result);
      expect(await pokemonsController.getAll()).toBe(result);
    });
  });
});
