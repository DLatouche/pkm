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
exports.BoxesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const box_schema_1 = require("../schemas/box.schema");
const type_schema_1 = require("../schemas/type.schema");
const mongoose_2 = require("@nestjs/mongoose");
const pokemons_service_1 = require("../pokemons/pokemons.service");
let BoxesService = class BoxesService {
    constructor(connection, boxModel, pokemonsService) {
        this.connection = connection;
        this.boxModel = boxModel;
        this.pokemonsService = pokemonsService;
    }
    async create(name) {
        const createdBox = new this.boxModel({ name: name });
        return createdBox.save();
    }
    async findAll() {
        return await this.boxModel.find().populate("pokemons");
    }
    async getSize(id) {
        return await (await this.boxModel.findById(id)).pokemons.length;
    }
    async getType(id) {
        let types = [];
        const box = await this.boxModel.findById(id).populate("pokemons");
        box.pokemons.forEach((pkm) => {
            var _a, _b, _c, _d;
            if (((_b = (_a = pkm.firstType) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b._id) && !types.includes(pkm.firstType[0]._id.toString()))
                types.push(pkm.firstType[0]._id.toString());
            if (((_d = (_c = pkm.secondType) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d._id) && !types.includes(pkm.secondType[0]._id.toString()))
                types.push(pkm.secondType[0]._id.toString());
        });
        return types;
    }
    async delete(id) {
        await this.boxModel.deleteOne({ _id: id });
        return;
    }
    async deletePokemon(idBox, idPokemon) {
        return await this.boxModel.updateOne({ _id: idBox }, { $pull: { pokemons: idPokemon } });
    }
    async addPokemon(idBox, idPokemon) {
        const box = await this.boxModel.findById(idBox);
        const pokemon = await this.pokemonsService.findById(idPokemon);
        box.pokemons.push(pokemon);
        await box.save();
        return box;
    }
};
BoxesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectConnection()), __param(1, mongoose_2.InjectModel("box")),
    __metadata("design:paramtypes", [mongoose_1.Connection, mongoose_1.Model, pokemons_service_1.PokemonsService])
], BoxesService);
exports.BoxesService = BoxesService;
//# sourceMappingURL=boxes.service.js.map