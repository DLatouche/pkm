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
exports.PokemonsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let PokemonsService = class PokemonsService {
    constructor(connection, pokemonModel) {
        this.connection = connection;
        this.pokemonModel = pokemonModel;
    }
    async create(name, types, trainer) {
        const createdPokemon = this.pokemonModel.create({ name: name });
        createdPokemon.firstType = types[0];
        if (types.length > 1)
            createdPokemon.secondType = types[1];
        createdPokemon.trainer = trainer;
        return createdPokemon.save();
    }
    async findAll() {
        return await this.pokemonModel.find().populate("trainer").populate("firstType").populate("secondType");
    }
    async findById(id) {
        return await this.pokemonModel.findById(id);
    }
};
PokemonsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectConnection()), __param(1, mongoose_2.InjectModel("pokemon")),
    __metadata("design:paramtypes", [mongoose_1.Connection, mongoose_1.Model])
], PokemonsService);
exports.PokemonsService = PokemonsService;
//# sourceMappingURL=pokemons.service.js.map