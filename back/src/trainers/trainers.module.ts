import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TrainerSchema } from 'src/schemas/trainer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "trainer", schema: TrainerSchema }])],
  controllers: [TrainersController],
  providers: [TrainersService],
  exports: [TrainersService]

})
export class TrainersModule { }
