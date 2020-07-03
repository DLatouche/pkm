import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TrainerSchema } from 'src/schemas/trainer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesModule } from 'src/boxes/boxes.module';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { TypesService } from 'src/types/types.service';
import { TypesModule } from 'src/types/types.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "trainer", schema: TrainerSchema }]), BoxesModule, PokemonsModule, TypesModule],
  controllers: [TrainersController],
  providers: [TrainersService],
  exports: [TrainersService]

})
export class TrainersModule { }
