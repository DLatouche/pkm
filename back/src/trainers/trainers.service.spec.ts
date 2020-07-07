import { Test, TestingModule } from '@nestjs/testing';
import { TrainersService } from './trainers.service';
import { BoxesService } from '../boxes/boxes.service';

describe('TrainersService', () => {
  let service: TrainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BoxesService],
      providers: [TrainersService],
    }).compile();

    service = module.get<TrainersService>(TrainersService);
  });

});
