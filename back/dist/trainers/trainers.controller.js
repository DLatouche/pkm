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
let TrainersController = class TrainersController {
    constructor(trainersService) {
        this.trainersService = trainersService;
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
    async addPokemon(id, idBox, name, firstType, secondType) {
        console.log('trainers.controller.ts -> 61: firstType', firstType);
        console.log('trainers.controller.ts -> 61: secondType', secondType);
        if ((firstType == null || firstType.length == 0) && (secondType == null || secondType.length == 0)) {
            throw new common_1.NotFoundException('Type not found.');
        }
        else {
            return await this.trainersService.addPokemon(id, idBox, name, firstType, secondType);
        }
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
    common_1.Post(":id/boxes/:idBox/addPokemon"),
    swagger_1.ApiOperation({ summary: 'Add pokemon to one box of trainer.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return pokemon.', }),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('idBox')), __param(2, common_1.Body('name')),
    __param(3, common_1.Body('firstType')), __param(4, common_1.Body('secondType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TrainersController.prototype, "addPokemon", null);
TrainersController = __decorate([
    swagger_1.ApiTags('trainers'),
    common_1.Controller('trainers'),
    __metadata("design:paramtypes", [trainers_service_1.TrainersService])
], TrainersController);
exports.TrainersController = TrainersController;
//# sourceMappingURL=trainers.controller.js.map