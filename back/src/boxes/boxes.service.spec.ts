import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from '../pokemons/pokemons.service';
import { Model, Connection } from 'mongoose';
import { Trainer } from '../schemas/trainer.schema';
import { BoxesService } from './boxes.service';
import { Box } from 'src/schemas/box.schema';

describe('Types Controller', () => {
  let boxesService: BoxesService;
  let pokemonsService: PokemonsService;
  let boxModel: Model<Box>
  let connection: Connection

  beforeEach(async () => {
    boxModel = { find: jest.fn(), findById: jest.fn(), create: jest.fn(), deleteOne: jest.fn(), updateOne: jest.fn() } as any;
    pokemonsService = { findById: jest.fn() } as any;
    connection = {} as any;
    boxesService = new BoxesService(connection, boxModel, pokemonsService);
  });

  describe('create', () => {
    it('should return a pokemon', async () => {
      const result = { id: "id", name: "name" };
      (boxModel.create as any).mockReturnValue(result);
      expect(await boxesService.create("name")).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of pokemon', async () => {
      const result = [{ id: "id", name: "name" }];
      const findMock = { populate: (arg) => result };

      (boxModel.find as any).mockReturnValue(findMock);
      expect(await boxesService.findAll()).toBe(result);
    });
  });

  describe('getSize', () => {
    it('should return size of pokemon box', async () => {
      const result = { id: "id", name: "name", pokemons: [] };
      (boxModel.findById as any).mockResolvedValue(result);
      expect(await boxesService.getSize("id")).toBe(0);
    });
  });

  describe('getType', () => {
    it('should return a type of box', async () => {
      const result = [];
      const findMock = { populate: (arg) => { return { id: "id", pokemons: [] } } };

      (boxModel.findById as any).mockReturnValue(findMock);
      expect(await boxesService.getType("id")).toStrictEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete a box', async () => {
      let result;
      (boxModel.deleteOne as any).mockResolvedValue({ id: "id" });
      expect(await boxesService.delete("id")).toBe(result);
    });
  });

  describe('deletePokemon', () => {
    it('should delete a pokemon', async () => {
      const result = {};
      (boxModel.updateOne as any).mockResolvedValue(result);
      expect(await boxesService.deletePokemon("id", "idPkm")).toBe(result);
    });
  });

  describe('addPokemon', () => {
    it('should add a pokemon', async () => {
      const result = { id: "id", name: "name", pokemons: [], save: ()=>{}};
      (boxModel.findById as any).mockResolvedValue(result);
      (pokemonsService.findById as any).mockResolvedValue({id: "id"});
      expect(await boxesService.addPokemon("id", 'idPkm')).toBe(result);
    });
  });

});

