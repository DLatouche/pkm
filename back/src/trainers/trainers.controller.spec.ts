import { Test, TestingModule } from '@nestjs/testing';
import { TrainersController } from './trainers.controller';

import { TrainersService } from './trainers.service';
import { BoxesService } from '../boxes/boxes.service';
import { PokemonsService } from '../pokemons/pokemons.service';
import { CreateTrainerDto } from './dto/createTrainer.dto';

describe('TrainerController', () => {
  let trainersController: TrainersController
  let trainersService: TrainersService;
  let boxesService: BoxesService;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    trainersService = { findAll: jest.fn(), create: jest.fn(), findById: jest.fn(), addBox: jest.fn(), findAllBoxes: jest.fn(), findOneBox: jest.fn(), deleteBox: jest.fn(), addPokemon: jest.fn(), move: jest.fn(), } as any;
    boxesService = { delete: jest.fn(), deletePokemon: jest.fn(), addPokemon: jest.fn() } as any;
    pokemonsService = { findById: jest.fn() } as any;
    trainersController = new TrainersController(trainersService, boxesService, pokemonsService);
  });

  describe('findAll', () => {
    it('should return an array of trainers', async () => {
      const result = [{ id: "a", name: "d", usersame: "e", password: "e" }];
      (trainersService.findAll as any).mockResolvedValue(result);
      expect(await trainersController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should return the new trainer', async () => {
      const result = { id: "a", name: "d", usersame: "e", password: "e" };
      const dto = new CreateTrainerDto();
      (trainersService.create as any).mockResolvedValue(result);
      expect(await trainersController.create(dto)).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a trainer', async () => {
      const result = { id: "a", name: "d", usersame: "e", password: "e" };
      (trainersService.findById as any).mockResolvedValue(result);
      expect(await trainersController.findById("idTrainer")).toBe(result);
    });
  });

  describe('addBox', () => {
    it('should return a trainer', async () => {
      const result = { id: "a", name: "d", usersame: "e", password: "e" };
      (trainersService.addBox as any).mockResolvedValue(result);
      expect(await trainersController.addBox("IdTrainer", "nameBox")).toBe(result);
    });
  });

  describe('getAllBoxes', () => {
    it('should return a all box of trainer', async () => {
      const result = [{ id: "a", name: "d", }];
      (trainersService.findAllBoxes as any).mockResolvedValue(result);
      expect(await trainersController.getAllBoxes("idTrainer")).toBe(result);
    });
  });

  describe('getBox', () => {
    it('should return a box of trainer', async () => {
      const result = { id: "a", name: "d", };
      (trainersService.findOneBox as any).mockResolvedValue(result);
      expect(await trainersController.getBox("idTrainer", "idBox")).toBe(result);
    });
  });

  describe('deleteBox', () => {
    it('should delete a box of trainer', async () => {
      const result = "idBox";
      const boxResult = { id: "a", name: "d", pokemons: [] };
      (trainersService.findOneBox as any).mockResolvedValue(boxResult);
      (boxesService.delete as any).mockResolvedValue(result);
      expect(await trainersController.deleteBox("idTrainer", "idBox")).toBe(result);
    });
  });

  describe('addPokemon', () => {
    it('should add pokemon to trainer', async () => {
      const result = { id: "pokemonId" };
      (trainersService.addPokemon as any).mockResolvedValue(result);
      expect(await trainersController.addPokemon("idTrainer", "idBox", "name", "firstTypeId", "secondTypeId")).toBe(result);
    });
  });

  describe('move', () => {
    it('should move pokemon from a box to an other box', async () => {
      const pkmResult = { id: "pokemonId" };
      const boxResult = { id: "idBox", pokemons: [] };
      (trainersService.findOneBox as any).mockResolvedValue(boxResult);
      (trainersService.findOneBox as any).mockResolvedValue(boxResult);
      (boxesService.deletePokemon as any).mockResolvedValue(pkmResult);
      (boxesService.addPokemon as any).mockResolvedValue(boxResult);
      (pokemonsService.findById as any).mockResolvedValue(pkmResult);
      expect(await trainersController.move("idTrainer", "idPokemon", "idFromBox", "idToBoxe")).toBe(pkmResult);
    });
  });

});
