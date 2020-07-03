import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TrainerSchema } from 'src/schemas/trainer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesModule } from 'src/boxes/boxes.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "trainer", schema: TrainerSchema }]), BoxesModule],
  controllers: [TrainersController],
  providers: [TrainersService],
  exports: [TrainersService]

})
export class TrainersModule { }
