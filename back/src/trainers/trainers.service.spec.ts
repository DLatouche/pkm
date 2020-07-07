import { Test, TestingModule } from '@nestjs/testing';
import { Model, Connection } from 'mongoose';

import { TrainersService } from './trainers.service';
import { Trainer } from '../schemas/trainer.schema';
import { BoxesService } from '../boxes/boxes.service';
import { PokemonsService } from '../pokemons/pokemons.service';
import { TypesService } from '../types/types.service';

describe('Types Controller', () => {
  let trainersService: TrainersService;
  let trainerModel: Model<Trainer>;
  let connection: Connection;
  let boxesService: BoxesService;
  let pokemonsService: PokemonsService;
  let typesService: TypesService;

  beforeEach(async () => {
    trainerModel = { find: jest.fn(), findById: jest.fn(), findOne: jest.fn(), create: jest.fn() } as any;
    boxesService = { delete: jest.fn(), deletePokemon: jest.fn(), addPokemon: jest.fn(), create: jest.fn() } as any;
    pokemonsService = { findById: jest.fn() } as any;
    typesService = { findById: jest.fn() } as any;
    connection = {} as any;
    trainersService = new TrainersService(connection, trainerModel, boxesService, pokemonsService, typesService);
  });

  describe('create', () => {
    it('should return a trainer', async () => {
      const resultFindOne = null;
      (trainerModel.findOne as any).mockResolvedValue(resultFindOne);

      const result = { id: "" };
      (trainerModel.create as any).mockResolvedValue(result);
      expect(await trainersService.create("name", "username", "password")).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of trainer', async () => {
      const result = [{ id: "id", name: "name" }];
      const findMock = { populate: (arg) => result };

      (trainerModel.find as any).mockReturnValue(findMock);
      expect(await trainersService.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a trainer', async () => {
      const result = { id: "id", name: "name" };
      const findMock = { populate: (arg) => result };

      (trainerModel.findById as any).mockReturnValue(findMock);
      expect(await trainersService.findById("idType")).toBe(result);
    });
  });

  describe('findByUsername', () => {
    it('should return a trainer by username', async () => {
      const result = { id: "id", name: "name" };
      (trainerModel.findOne as any).mockResolvedValue(result);
      expect(await trainersService.findByUsername("username")).toBe(result);
    });
  });

  describe('addBox', () => {
    it('should return a trainer', async () => {
      const result = { id: "idType", name: "nameType", boxes: [], save: () => result };
      (trainerModel.findById as any).mockResolvedValue(result);
      (boxesService.create as any).mockReturnValue({ save: () => { return { id: "id" } } });
      expect(await trainersService.addBox("trainerId", "name")).toBe(result);
    });
  });

  describe('findAllBoxes', () => {
    it('should return all boxes of trainer', async () => {
      const result = [];
      const findMock = { populate: (arg) => { return { id: "id", boxes: result } } };

      (trainerModel.findById as any).mockReturnValue(findMock);
      expect(await trainersService.findAllBoxes("idTrainer")).toBe(result);
    });
  });

  describe('findOneBox', () => {
    it('should return a type', async () => {
      const result = { id: "id", name: "name" };
      const findMock = { populate: (arg) => { return { id: "id", boxes: [result] } } };
      (trainerModel.findById as any).mockReturnValue(findMock);
      expect(await trainersService.findOneBox("idTrainer", "idBox")).toBe(result);
    });
  });

});

