import { Test, TestingModule } from '@nestjs/testing';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';

describe('Boxes Controller', () => {
  let boxesController: BoxesController;
  let boxesService: BoxesService;


  beforeEach(async () => {
    boxesService = { findAll: jest.fn(), deletePokemon: jest.fn() } as any;
    boxesController = new BoxesController(boxesService);
  });


  describe('getAll', () => {
    it('should return an array of box', async () => {
      const result = [{ id: "idBox", pokemons: [] }];
      (boxesService.findAll as any).mockResolvedValue(result);
      expect(await boxesController.getAll()).toBe(result);
    });
  });

  describe('deletePokemon', () => {
    it('should return an array of pokemon', async () => {
      let result;
      (boxesService.findAll as any).mockResolvedValue(result);
      expect(await boxesController.deletePokemon("idBox", "idPokemon")).toBe(result);
    });
  });
});
