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
exports.TrainersController = void 0;
const common_1 = require("@nestjs/common");
const trainers_service_1 = require("./trainers.service");
const swagger_1 = require("@nestjs/swagger");
const trainer_schema_1 = require("../schemas/trainer.schema");
const box_schema_1 = require("../schemas/box.schema");
const pokemon_schema_1 = require("../schemas/pokemon.schema");
const boxes_service_1 = require("../boxes/boxes.service");
const pokemons_service_1 = require("../pokemons/pokemons.service");
let TrainersController = class TrainersController {
    constructor(trainersService, boxesService, pokemonsService) {
        this.trainersService = trainersService;
        this.boxesService = boxesService;
        this.pokemonsService = pokemonsService;
    }
    async create(name, username, password) {
        return await this.trainersService.create(name, username, password);
    }
    async findAll() {
        return await this.trainersService.findAll();
    }
    async findById(id) {
        return await this.trainersService.findById(id);
    }
    async addBox(id, boxName) {
        return await this.trainersService.addBox(id, boxName);
    }
    async getAllBoxes(id) {
        return await this.trainersService.findAllBoxes(id);
    }
    async getBox(id, idBox) {
        return await this.trainersService.findOneBox(id, idBox);
    }
    async deleteBox(id, idBox) {
        const box = await this.trainersService.findOneBox(id, idBox);
        if (box.pokemons.length > 0)
            throw new common_1.ForbiddenException("Box not empty");
        await this.boxesService.delete(idBox);
        return idBox;
    }
    async addPokemon(trainerId, boxId, name, firstType, secondType) {
        if ((firstType == null || firstType.length == 0) && (secondType == null || secondType.length == 0)) {
            throw new common_1.NotFoundException('Type not found.');
        }
        else {
            return await this.trainersService.addPokemon(trainerId, boxId, name, firstType, secondType);
        }
    }
    async move(id, pokemonId, fromBoxId, toBoxId) {
        const fromBox = await this.trainersService.findOneBox(id, fromBoxId);
        const toBox = await this.trainersService.findOneBox(id, toBoxId);
        if (!fromBox || !toBox)
            throw new common_1.NotFoundException('box not found.');
        if (toBox.pokemons.length >= 24)
            throw new common_1.ForbiddenException("The pokemon box is full.");
        const pokemon = await this.pokemonsService.findById(pokemonId);
        if (!pokemon)
            throw new common_1.NotFoundException('pokemon not found.');
        await this.boxesService.deletePokemon(fromBox._id, pokemon._id);
        await this.boxesService.addPokemon(toBox._id, pokemon._id);
        return pokemon;
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create trainer.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return the created trainer.', }),
    __param(0, common_1.Body('name')), __param(1, common_1.Body('username')), __param(2, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get all trainers with boxes.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return all trainers.', }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    swagger_1.ApiOperation({ summary: 'Get one trainers by id with boxes.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return the trainer.', }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "findById", null);
__decorate([
    common_1.Post(':id/boxes'),
    swagger_1.ApiOperation({ summary: 'Add box to trainer.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return the trainer with his boxes.', }),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('boxName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "addBox", null);
__decorate([
    common_1.Get(":id/boxes"),
    swagger_1.ApiOperation({ summary: 'Get all boxes of trainer.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return all boxes of trainer.', }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "getAllBoxes", null);
__decorate([
    common_1.Get(":id/boxes/:idBox"),
    swagger_1.ApiOperation({ summary: 'Get one box of trainer.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return one box of trainer.', }),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('idBox')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "getBox", null);
__decorate([
    common_1.Delete(":id/boxes/:idBox"),
    swagger_1.ApiOperation({ summary: 'Delete trainer box' }),
    swagger_1.ApiResponse({ status: 201, description: 'return id of deleted box', }),
    swagger_1.ApiResponse({ status: 402, description: 'Box not empty', }),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('idBox')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "deleteBox", null);
__decorate([
    common_1.Post(":trainerId/boxes/:boxId"),
    swagger_1.ApiOperation({ summary: 'Add pokemon from boxOne to boxTwo.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return pokemon.', }),
    __param(0, common_1.Param('trainerId')), __param(1, common_1.Param('boxId')),
    __param(2, common_1.Body('name')), __param(3, common_1.Body('firstType')), __param(4, common_1.Body('secondType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "addPokemon", null);
__decorate([
    common_1.Post(":id/move"),
    swagger_1.ApiOperation({ summary: 'Move pokemon from boxOne to boxTwo.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return pokemon.', }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body('pokemonId')),
    __param(2, common_1.Body('fromBoxId')), __param(3, common_1.Body('toBoxId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "move", null);
TrainersController = __decorate([
    swagger_1.ApiTags('trainers'),
    common_1.Controller('trainers'),
    __metadata("design:paramtypes", [trainers_service_1.TrainersService, boxes_service_1.BoxesService, pokemons_service_1.PokemonsService])
], TrainersController);
exports.TrainersController = TrainersController;
//# sourceMappingURL=trainers.controller.js.map