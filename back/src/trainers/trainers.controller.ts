import { Controller, Post, Get, Body, Param, NotFoundException, Delete, ForbiddenException } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Trainer } from 'src/schemas/trainer.schema';
import { Box } from 'src/schemas/box.schema';
import { Pokemon } from 'src/schemas/pokemon.schema';
import { BoxesService } from 'src/boxes/boxes.service';

@ApiTags('trainers')
@Controller('trainers')
export class TrainersController {

    constructor(private trainersService: TrainersService, private boxesService: BoxesService) { }

    @Post()
    @ApiOperation({ summary: 'Create trainer.' })
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
    @ApiOperation({ summary: 'Add box to trainer.' })
    @ApiResponse({ status: 201, description: 'Return the trainer with his boxes.', })
    async addBox(@Param('id') id: string,
        @Body('boxName') boxName: string): Promise<Trainer> {
        return await this.trainersService.addBox(id, boxName);
    }

    @Get(":id/boxes")
    @ApiOperation({ summary: 'Get all boxes of trainer.' })
    @ApiResponse({ status: 201, description: 'Return all boxes of trainer.', })
    async getAllBoxes(@Param('id') id: string): Promise<Box[]> {
        return await this.trainersService.findAllBoxes(id);
    }

    @Get(":id/boxes/:idBox")
    @ApiOperation({ summary: 'Get one box of trainer.' })
    @ApiResponse({ status: 201, description: 'Return one box of trainer.', })
    async getBox(@Param('id') id: string, @Param('idBox') idBox: string): Promise<Box> {
        return await this.trainersService.findOneBox(id, idBox);
    }

    @Delete(":id/boxes/:idBox")
    @ApiOperation({ summary: 'Delete trainer box' })
    @ApiResponse({ status: 201, description: 'return id of deleted box', })
    @ApiResponse({ status: 402, description: 'Box not empty', })
    async deleteBox(@Param('id') id: string, @Param('idBox') idBox: string): Promise<string> {
        const box = await this.trainersService.findOneBox(id, idBox);
        if (box.pokemons.length > 0) throw new ForbiddenException("Box not empty");
        await this.boxesService.delete(idBox);
        return idBox
    }

    @Post(":id/boxes/:idBox/addPokemon")
    @ApiOperation({ summary: 'Add pokemon to one box of trainer.' })
    @ApiResponse({ status: 201, description: 'Return pokemon.', })
    async addPokemon(@Param('id') id: string, @Param('idBox') idBox: string, @Body('name') name: string,
        @Body('firstType') firstType: string, @Body('secondType') secondType: string): Promise<Pokemon> {
        if ((firstType == null || firstType.length == 0) && (secondType == null || secondType.length == 0)) {
            throw new NotFoundException('Type not found.');
        } else {
            return await this.trainersService.addPokemon(id, idBox, name, firstType, secondType);
        }
    }

}
