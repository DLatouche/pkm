import { Module } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeSchema } from 'src/schemas/type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "type", schema: TypeSchema }])],
  controllers: [TypesController],
  providers: [TypesService],
  exports: [TypesService]
})
export class TypesModule {}
