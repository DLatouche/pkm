import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BoxesService } from 'src/boxes/boxes.service';
import { Trainer } from 'src/schemas/trainer.schema';
import { Box } from 'src/schemas/box.schema';
import { PokemonsService } from 'src/pokemons/pokemons.service';
import { TypesService } from 'src/types/types.service';

@Injectable()
export class TrainersService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("trainer") private readonly trainerModel: Model<Trainer>, private boxesService: BoxesService, private pokemonsService: PokemonsService, private typesService: TypesService) { }

    async create(name: string, username: string, password: string): Promise<Trainer> {
        const createdTrainer = new this.trainerModel({ name: name, username: username, password: password });
        return createdTrainer.save();
    }

    async findAll(): Promise<Trainer[]> {
        return await this.trainerModel.find().populate("boxes");
    }

    async addBox(id: string, name: string): Promise<Trainer> {
        let trainer: Trainer;
        try {
            trainer = await this.trainerModel.findById(id).exec();
            if (!trainer) {
                throw new NotFoundException('Could not find trainer.');
            } else {
                let box: Box = await this.boxesService.create(name);
                box = await box.save();
                await trainer.boxes.push(box);
                trainer = await trainer.save();
            }
        } catch (error) {
            throw new NotFoundException('Could not find trainer.');
        }
        return trainer;
    }

    async findById(id: string): Promise<Trainer> {
        return await this.trainerModel.findById(id).populate("boxes");
    }

    async findAllBoxes(id: string): Promise<Box[]> {
        const trainer = await this.trainerModel.findById(id).populate("boxes")
        return trainer.boxes;
    }

    async findOneBox(trainerId: string, boxId: string): Promise<Box> {
        const trainer = await this.trainerModel.findById(trainerId).populate({ path: "boxes", match: { _id: boxId } })
        console.log('trainers.service.ts -> 50: trainer', trainer)
        return trainer.boxes[0];
    }

    async addPokemon(trainerId: string, boxId: string, name: string, firstTypeId: string, secondTypeId: string) {
        let promisesType = []
        try {
            if (firstTypeId != null && firstTypeId.length > 0) promisesType.push(this.typesService.findById(firstTypeId))
            if (secondTypeId != null && secondTypeId.length > 0) promisesType.push(this.typesService.findById(secondTypeId))
            const types = await Promise.all(promisesType);
            if(types.length == 0) throw new NotFoundException('Type not found.');
            const trainer = await this.findById(trainerId) 
            console.log('trainers.service.ts -> 64: trainer', trainer )
            let box = await this.findOneBox(trainerId, boxId)
            console.log('trainers.service.ts -> 66: box', box )
            let pokemon = await this.pokemonsService.create(name, types, trainer);
            console.log('trainers.service.ts -> 68: pokemon', pokemon )
            box.pokemons.push(pokemon)
            await box.save();
            console.log('trainers.service.ts -> 71: box', box )
            return pokemon
        } catch (e) {
            console.log('trainers.service.ts -> 63: error', e)
            throw new NotFoundException('Type not found.');
        }
       
    }
}
