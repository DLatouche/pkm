import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TrainerSchema } from '../schemas/trainer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesModule } from '../boxes/boxes.module';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { TypesModule } from '../types/types.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "trainer", schema: TrainerSchema }]), BoxesModule, PokemonsModule, TypesModule],
  controllers: [TrainersController],
  providers: [TrainersService],
  exports: [TrainersService]

})
export class TrainersModule { }
