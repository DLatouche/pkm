import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from './pokemons.service';
import { Model, Connection } from 'mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { Type } from '../schemas/type.schema';
import { Trainer } from '../schemas/trainer.schema';

describe('Types Controller', () => {
  let pokemonsService: PokemonsService;
  let pokemonModel: Model<Pokemon>
  let connection: Connection

  beforeEach(async () => {
    pokemonModel = { find: jest.fn(), findById: jest.fn(), create: jest.fn() } as any;
    connection = {} as any;
    pokemonsService = new PokemonsService(connection, pokemonModel);
  });

  describe('create', () => {
    it('should return a pokemon', async () => {
      const result = { id: "id", name: "name" };
      (pokemonModel.create as any).mockReturnValue({ id: "id", save: () => result });
      expect(await pokemonsService.create("name", [], {} as Trainer)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of pokemon', async () => {
      const result = [{ id: "id", name: "name" }];
      const findMock = { populate: (arg) => { return { populate: (arg) => { return { populate: () => result } } } } };

      (pokemonModel.find as any).mockReturnValue(findMock);
      expect(await pokemonsService.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a pokemon', async () => {
      const result = { id: "id", name: "name" };
      (pokemonModel.findById as any).mockResolvedValue(result);
      expect(await pokemonsService.findById("idType")).toBe(result);
    });
  });

});

