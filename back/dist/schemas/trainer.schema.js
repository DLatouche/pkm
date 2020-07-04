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
exports.TrainerSchema = exports.Trainer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Trainer = class Trainer extends mongoose.Document {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Trainer.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'box' }]),
    __metadata("design:type", Array)
], Trainer.prototype, "boxes", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Trainer.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Trainer.prototype, "username", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Trainer.prototype, "password", void 0);
Trainer = __decorate([
    mongoose_1.Schema()
], Trainer);
exports.Trainer = Trainer;
exports.TrainerSchema = mongoose_1.SchemaFactory.createForClass(Trainer);
//# sourceMappingURL=trainer.schema.js.map