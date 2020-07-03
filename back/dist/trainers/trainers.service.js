"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const boxes_service_1 = require("../boxes/boxes.service");
const trainer_schema_1 = require("../schemas/trainer.schema");
const box_schema_1 = require("../schemas/box.schema");
const pokemons_service_1 = require("../pokemons/pokemons.service");
const types_service_1 = require("../types/types.service");
let TrainersService = class TrainersService {
    constructor(connection, trainerModel, boxesService, pokemonsService, typesService) {
        this.connection = connection;
        this.trainerModel = trainerModel;
        this.boxesService = boxesService;
        this.pokemonsService = pokemonsService;
        this.typesService = typesService;
    }
    async create(name, username, password) {
        const createdTrainer = new this.trainerModel({ name: name, username: username, password: password });
        return createdTrainer.save();
    }
    async findAll() {
        return await this.trainerModel.find().populate("boxes");
    }
    async addBox(id, name) {
        let trainer;
        try {
            trainer = await this.trainerModel.findById(id).exec();
            if (!trainer) {
                throw new common_1.NotFoundException('Could not find trainer.');
            }
            else {
                let box = await this.boxesService.create(name);
                box = await box.save();
                await trainer.boxes.push(box);
                trainer = await trainer.save();
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find trainer.');
        }
        return trainer;
    }
    async findById(id) {
        return await this.trainerModel.findById(id).populate("boxes");
    }
    async findAllBoxes(id) {
        const trainer = await this.trainerModel.findById(id).populate("boxes");
        return trainer.boxes;
    }
    async findOneBox(trainerId, boxId) {
        const trainer = await this.trainerModel.findById(trainerId).populate({ path: "boxes", match: { _id: boxId } });
        console.log('trainers.service.ts -> 50: trainer', trainer);
        return trainer.boxes[0];
    }
    async addPokemon(trainerId, boxId, name, firstTypeId, secondTypeId) {
        let promisesType = [];
        try {
            if (firstTypeId != null && firstTypeId.length > 0)
                promisesType.push(this.typesService.findById(firstTypeId));
            if (secondTypeId != null && secondTypeId.length > 0)
                promisesType.push(this.typesService.findById(secondTypeId));
            const types = await Promise.all(promisesType);
            if (types.length == 0)
                throw new common_1.NotFoundException('Type not found.');
            const trainer = await this.findById(trainerId);
            console.log('trainers.service.ts -> 64: trainer', trainer);
            let box = await this.findOneBox(trainerId, boxId);
            console.log('trainers.service.ts -> 66: box', box);
            let pokemon = await this.pokemonsService.create(name, types, trainer);
            console.log('trainers.service.ts -> 68: pokemon', pokemon);
            box.pokemons.push(pokemon);
            await box.save();
            console.log('trainers.service.ts -> 71: box', box);
            return pokemon;
        }
        catch (e) {
            console.log('trainers.service.ts -> 63: error', e);
            throw new common_1.NotFoundException('Type not found.');
        }
    }
};
TrainersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectConnection()), __param(1, mongoose_2.InjectModel("trainer")),
    __metadata("design:paramtypes", [mongoose_1.Connection, mongoose_1.Model, boxes_service_1.BoxesService, pokemons_service_1.PokemonsService, types_service_1.TypesService])
], TrainersService);
exports.TrainersService = TrainersService;
//# sourceMappingURL=trainers.service.js.map