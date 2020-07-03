import { Controller, Post, Get, Body } from '@nestjs/common';
import { TypesService } from './types.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Type } from 'src/schemas/type.schema';

@ApiTags('types')
@Controller('types')
export class TypesController {
    constructor(private typesService: TypesService) { }

    @Post()
    @ApiOperation({ summary: 'Create type' })
    @ApiResponse({ status: 201, description: 'Return the created type.', })
    @ApiResponse({ status: 403, description: 'Return Forbidden is type is already created', })
    async create(@Body('name') name: string): Promise<Type> {
        return await this.typesService.create(name);
    }

    @Get()
    @ApiOperation({ summary: 'Get all types.' })
    @ApiResponse({ status: 201, description: 'Return all types.', })
    async findAll(): Promise<Type[]> {
        return await this.typesService.findAll();
    }

}
