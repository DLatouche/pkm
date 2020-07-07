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
exports.TypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TypesService = class TypesService {
    constructor(connection, typeModel) {
        this.connection = connection;
        this.typeModel = typeModel;
    }
    async create(name) {
        const getType = await this.typeModel.findOne({ name: name });
        if (getType == null) {
            return this.typeModel.create({ name: name });
        }
        else {
            throw new common_1.ForbiddenException('Type already exist');
        }
    }
    async findAll() {
        return await this.typeModel.find();
    }
    async findById(id) {
        return await this.typeModel.findById(id);
    }
};
TypesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectConnection()), __param(1, mongoose_1.InjectModel("type")),
    __metadata("design:paramtypes", [mongoose_2.Connection, mongoose_2.Model])
], TypesService);
exports.TypesService = TypesService;
//# sourceMappingURL=types.service.js.map