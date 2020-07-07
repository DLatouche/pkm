
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypesService } from '../src/types/types.service';
import { TypesModule } from '../src/types/types.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('Types', () => {
    let app: INestApplication;
    let typesServices = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [MongooseModule.forRoot('mongodb://localhost:27017/pkmTest'), TypesModule],
        })
            .overrideProvider(TypesService)
            .useValue(typesServices)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET types`, () => {
        return request(app.getHttpServer())
            .get('/types')
            .expect(200)
            .expect(
                typesServices.findAll(),
            );
    });

    afterAll(async () => {
        await app.close();
    });
});