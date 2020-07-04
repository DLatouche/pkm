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
exports.BoxesController = void 0;
const common_1 = require("@nestjs/common");
const boxes_service_1 = require("./boxes.service");
const box_schema_1 = require("../schemas/box.schema");
const swagger_1 = require("@nestjs/swagger");
const pokemon_schema_1 = require("../schemas/pokemon.schema");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BoxesController = class BoxesController {
    constructor(boxesService) {
        this.boxesService = boxesService;
    }
    async getAll() {
        return await this.boxesService.findAll();
    }
    async deletePokemon(id, pokemonId) {
        console.log('boxes.controller.ts -> 24: pokemonId', pokemonId);
        return await this.boxesService.deletePokemon(id, pokemonId);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get all boxes.' }),
    swagger_1.ApiResponse({ status: 201, description: 'All boxes.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoxesController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(":id/remove/:pokemonId"),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: 'Delete one pokemon on one box.' }),
    swagger_1.ApiResponse({ status: 200, description: 'Object with number of row who is concerned.' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('pokemonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BoxesController.prototype, "deletePokemon", null);
BoxesController = __decorate([
    swagger_1.ApiTags('boxes'),
    common_1.Controller('boxes'),
    __metadata("design:paramtypes", [boxes_service_1.BoxesService])
], BoxesController);
exports.BoxesController = BoxesController;
//# sourceMappingURL=boxes.controller.js.map