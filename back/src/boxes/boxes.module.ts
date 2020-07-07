import { Module } from '@nestjs/common';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxSchema } from '../schemas/box.schema';
import { PokemonsModule } from '../pokemons/pokemons.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "box", schema: BoxSchema }]), PokemonsModule],
  controllers: [BoxesController],
  providers: [BoxesService],
  exports: [BoxesService]
})
export class BoxesModule {}
