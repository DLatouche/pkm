import { Module } from '@nestjs/common';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxSchema } from 'src/schemas/box.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "box", schema: BoxSchema }])],
  controllers: [BoxesController],
  providers: [BoxesService],
  exports: [BoxesService]
})
export class BoxesModule {}
