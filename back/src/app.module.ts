import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainersModule } from './trainers/trainers.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/pkm'), TrainersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
