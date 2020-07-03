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
exports.TypesController = void 0;
const common_1 = require("@nestjs/common");
const types_service_1 = require("./types.service");
const swagger_1 = require("@nestjs/swagger");
const type_schema_1 = require("../schemas/type.schema");
let TypesController = class TypesController {
    constructor(typesService) {
        this.typesService = typesService;
    }
    async create(name) {
        return await this.typesService.create(name);
    }
    async findAll() {
        return await this.typesService.findAll();
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create type' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return the created type.', }),
    swagger_1.ApiResponse({ status: 403, description: 'Return Forbidden is type is already created', }),
    __param(0, common_1.Body('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get all types.' }),
    swagger_1.ApiResponse({ status: 201, description: 'Return all types.', }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypesController.prototype, "findAll", null);
TypesController = __decorate([
    ApiTags('types'),
    common_1.Controller('types'),
    __metadata("design:paramtypes", [types_service_1.TypesService])
], TypesController);
exports.TypesController = TypesController;
//# sourceMappingURL=types.controller.js.map