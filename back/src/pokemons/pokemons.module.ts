import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from '../schemas/pokemon.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "pokemon", schema: PokemonSchema }])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
  exports: [PokemonsService]

})
export class PokemonsModule {}
