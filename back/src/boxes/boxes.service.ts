import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Box } from '../schemas/box.schema';
import { Type } from '../schemas/type.schema';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { PokemonsService } from '../pokemons/pokemons.service';

@Injectable()
export class BoxesService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel("box") private readonly boxModel: Model<Box>, private pokemonsService: PokemonsService) { }

    async create(name: string): Promise<Box> {
        return this.boxModel.create({ name: name });
    }

    async findAll(): Promise<Box[]> {
        return this.boxModel.find().populate("pokemons");
    }

    async getSize(id: string): Promise<number> {
        return (await this.boxModel.findById(id)).pokemons.length;
    }

    async getType(id: string): Promise<string[]> {
        let types: string[] = [];
        const box = await this.boxModel.findById(id).populate("pokemons");
        box.pokemons.forEach((pkm) => {
            if (pkm.firstType?.[0]?._id && !types.includes(pkm.firstType[0]._id.toString())) types.push(pkm.firstType[0]._id.toString())
            if (pkm.secondType?.[0]?._id && !types.includes(pkm.secondType[0]._id.toString())) types.push(pkm.secondType[0]._id.toString())
        })
        return types;
    }

    async delete(id: string): Promise<void> {
        await this.boxModel.deleteOne({ _id: id });
        return
    }

    async deletePokemon(idBox: string, idPokemon: string): Promise<Object> {
        return await this.boxModel.updateOne({ _id: idBox }, { $pull: { pokemons: idPokemon } });
    }

    async addPokemon(idBox: string, idPokemon: string): Promise<Box> {
        const box = await this.boxModel.findById(idBox);
        const pokemon = await this.pokemonsService.findById(idPokemon);
        box.pokemons.push(pokemon);
        await box.save();
        return box;
    }
}
