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
exports.PokemonSchema = exports.Pokemon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const type_schema_1 = require("./type.schema");
const trainer_schema_1 = require("./trainer.schema");
let Pokemon = class Pokemon extends mongoose.Document {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Pokemon.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop(),
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Pokemon.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'type' }),
    __metadata("design:type", type_schema_1.Type)
], Pokemon.prototype, "firstType", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'type' }),
    __metadata("design:type", type_schema_1.Type)
], Pokemon.prototype, "secondType", void 0);
__decorate([
    mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'trainer' }),
    __metadata("design:type", trainer_schema_1.Trainer)
], Pokemon.prototype, "trainer", void 0);
Pokemon = __decorate([
    mongoose_1.Schema()
], Pokemon);
exports.Pokemon = Pokemon;
exports.PokemonSchema = mongoose_1.SchemaFactory.createForClass(Pokemon);
//# sourceMappingURL=pokemon.schema.js.map