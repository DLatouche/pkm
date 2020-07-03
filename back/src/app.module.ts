import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainersModule } from './trainers/trainers.module';
import { BoxesModule } from './boxes/boxes.module';
import { TypesModule } from './types/types.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TypeService } from './type/type.service';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/pkm'), TrainersModule, BoxesModule, TypesModule, PokemonsModule],
  controllers: [AppController],
  providers: [AppService, TypeService],
})
export class AppModule { }
