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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonsController = void 0;
const common_1 = require("@nestjs/common");
const pokemon_schema_1 = require("../schemas/pokemon.schema");
const pokemons_service_1 = require("./pokemons.service");
const swagger_1 = require("@nestjs/swagger");
let PokemonsController = class PokemonsController {
    constructor(pokemonsService) {
        this.pokemonsService = pokemonsService;
    }
    async getAll() {
        return await this.pokemonsService.findAll();
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get all pokemons.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Array of pokemon.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PokemonsController.prototype, "getAll", null);
PokemonsController = __decorate([
    swagger_1.ApiTags('pokemons'),
    common_1.Controller('pokemons'),
    __metadata("design:paramtypes", [pokemons_service_1.PokemonsService])
], PokemonsController);
exports.PokemonsController = PokemonsController;
//# sourceMappingURL=pokemons.controller.js.map