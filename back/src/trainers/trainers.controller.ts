import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Trainer } from 'src/schemas/trainer.schema';

@ApiTags('trainers')
@Controller('trainers')
export class TrainersController {

    constructor(private trainersService: TrainersService) { }

    @Post()
    @ApiOperation({ summary: 'Create trainer' })
    @ApiResponse({ status: 201, description: 'Return the created trainer.', })
    async create(@Body('name') name: string, @Body('username') username: string, @Body('password') password: string): Promise<Trainer> {
        return await this.trainersService.create(name, username, password);
    }

    @Get()
    @ApiOperation({ summary: 'Get all trainers with boxes.' })
    @ApiResponse({ status: 201, description: 'Return all trainers.', })
    async findAll(): Promise<Trainer[]> {
        return await this.trainersService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one trainers by id with boxes.' })
    @ApiResponse({ status: 201, description: 'Return the trainer.', })
    async findById(@Param('id') id: string): Promise<Trainer> {
        return await this.trainersService.findById(id);
    }

    @Post(':id/boxes')
    @ApiOperation({ summary: 'Add box to trainer' })
    @ApiResponse({ status: 201, description: 'Return the trainer with his boxes.', })
    async addBox(@Param('id') id: string,
        @Body('boxName') boxName: string): Promise<Trainer> {
        return await this.trainersService.addBox(id, boxName);
    }
}
