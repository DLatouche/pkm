import { Test, TestingModule } from '@nestjs/testing';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';

describe('Types Controller', () => {
  let typesController: TypesController;
  let typesService: TypesService;


  beforeEach(async () => {
    typesService = { create: jest.fn(), findAll: jest.fn() } as any;
    typesController = new TypesController(typesService);
  });

  describe('create', () => {
    it('should return a type', async () => {
      const result = { id: "idType", name: "nameType" };
      (typesService.create as any).mockResolvedValue(result);
      expect(await typesController.create("name")).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of type', async () => {
      const result = [{ id: "idType", name: "nameType" }];
      (typesService.findAll as any).mockResolvedValue(result);
      expect(await typesController.findAll()).toBe(result);
    });
  });
});
