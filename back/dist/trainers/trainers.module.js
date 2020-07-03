"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersModule = void 0;
const common_1 = require("@nestjs/common");
const trainers_controller_1 = require("./trainers.controller");
const trainers_service_1 = require("./trainers.service");
const trainer_schema_1 = require("../schemas/trainer.schema");
const mongoose_1 = require("@nestjs/mongoose");
const boxes_module_1 = require("../boxes/boxes.module");
let TrainersModule = class TrainersModule {
};
TrainersModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "trainer", schema: trainer_schema_1.TrainerSchema }]), boxes_module_1.BoxesModule],
        controllers: [trainers_controller_1.TrainersController],
        providers: [trainers_service_1.TrainersService],
        exports: [trainers_service_1.TrainersService]
    })
], TrainersModule);
exports.TrainersModule = TrainersModule;
//# sourceMappingURL=trainers.module.js.map