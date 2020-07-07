import { Test, TestingModule } from '@nestjs/testing';
import { TypesService } from './types.service';
import { Model, Connection } from 'mongoose';
import { TypeSchema, Type } from '../schemas/type.schema';

describe('Types Controller', () => {
  let typesService: TypesService;
  let typeModel: Model<Type>
  let connection: Connection

  beforeEach(async () => {
    typeModel = { find: jest.fn(), findById: jest.fn(), findOne: jest.fn(), create: jest.fn() } as any;
    connection = {} as any;
    typesService = new TypesService(connection, typeModel);
  });

  describe('create', () => {
    it('should return a type', async () => {
      const resultFindOne = null;
      (typeModel.findOne as any).mockResolvedValue(resultFindOne);

      const result = { id: "idType", name: "nameType" };
      (typeModel.create as any).mockResolvedValue(result);
      expect(await typesService.create("nameType")).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of type', async () => {
      const result = [{ id: "idType", name: "nameType" }];
      (typeModel.find as any).mockResolvedValue(result);
      expect(await typesService.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a type', async () => {
      const result = { id: "idType", name: "nameType" };
      (typeModel.findById as any).mockResolvedValue(result);
      expect(await typesService.findById("idType")).toBe(result);
    });
  });

});

