import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BoxesService } from '../boxes/boxes.service';
import { Trainer } from '../schemas/trainer.schema';
import { Box } from '../schemas/box.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { TypesService } from '../types/types.service';
import { Pokemon } from '../schemas/pokemon.schema';

@Injectable()
export class TrainersService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("trainer") private readonly trainerModel: Model<Trainer>, private boxesService: BoxesService, private pokemonsService: PokemonsService, private typesService: TypesService) { }

    async create(name: string, username: string, password: string): Promise<Trainer> {
        const testTrainer = await this.trainerModel.findOne({ username: username })
        if (testTrainer) throw new ForbiddenException("Trainer already exist");
        return this.trainerModel.create({ name: name, username: username, password: password, boxes: [] });
    }

    async findAll(): Promise<Trainer[]> {
        return await this.trainerModel.find().populate("boxes");
    }

    async findByUsername(username: string): Promise<Trainer> {
        return this.trainerModel.findOne({ username: username });
    }

    async addBox(id: string, name: string): Promise<Trainer> {
        let trainer: Trainer;
        try {
            trainer = await this.trainerModel.findById(id);
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
        return trainer.boxes[0];
    }

    async addPokemon(trainerId: string, boxId: string, name: string, firstTypeId: string, secondTypeId: string): Promise<Pokemon> {
        let promisesType = []
        // Verification if type exist
        if (firstTypeId != null && firstTypeId.length > 0) promisesType.push(this.typesService.findById(firstTypeId))
        if (secondTypeId != null && secondTypeId.length > 0) promisesType.push(this.typesService.findById(secondTypeId))
        const types = await Promise.all(promisesType);
        if (types.length == 0) throw new NotFoundException('Type not found.');

        // Verification if trainer exist
        const trainer = await this.trainerModel.findById(trainerId).populate("boxes");
        if (trainer == null) throw new NotFoundException('Trainer not found.');

        // Verification if box exist
        let box = await this.findOneBox(trainerId, boxId)
        if (box == null) throw new NotFoundException('Box not found.');
        // Verification box size
        if (box.pokemons.length >= 24) throw new ForbiddenException("The pokemon box is full.")
        // Verification type of box
        const typeOfBox = await this.boxesService.getType(boxId);
        let nbNotInclude = 0
        types.forEach((t) => {
            if (!typeOfBox.includes(t._id.toString())) nbNotInclude++
        })
        if (nbNotInclude > 2 - typeOfBox.length) throw new ForbiddenException("The pokemon box has already two different types.")

        // Create pokemon
        let pokemon = await this.pokemonsService.create(name, types, trainer);
        // Add pokemon to box
        box.pokemons.push(pokemon)
        await box.save();
        return pokemon
    }
}
