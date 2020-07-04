"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxesModule = void 0;
const common_1 = require("@nestjs/common");
const boxes_controller_1 = require("./boxes.controller");
const boxes_service_1 = require("./boxes.service");
const mongoose_1 = require("@nestjs/mongoose");
const box_schema_1 = require("../schemas/box.schema");
const pokemons_module_1 = require("../pokemons/pokemons.module");
let BoxesModule = class BoxesModule {
};
BoxesModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "box", schema: box_schema_1.BoxSchema }]), pokemons_module_1.PokemonsModule],
        controllers: [boxes_controller_1.BoxesController],
        providers: [boxes_service_1.BoxesService],
        exports: [boxes_service_1.BoxesService]
    })
], BoxesModule);
exports.BoxesModule = BoxesModule;
//# sourceMappingURL=boxes.module.js.map