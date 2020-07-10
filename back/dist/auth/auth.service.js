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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const trainers_service_1 = require("../trainers/trainers.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(trainersService, jwtService) {
        this.trainersService = trainersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.trainersService.findByUsername(username);
        if (user && user.password == password) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = { username: user.username, sub: user._id };
        let dataUser = await this.trainersService.findById(user._id);
        console.log('auth.service.ts -> 23: dataUser', dataUser);
        let boxes = [];
        dataUser.boxes.forEach((b) => {
            boxes.push({ id: b._id, pokemons: b.pokemons, name: b.name });
        });
        return {
            access_token: this.jwtService.sign(payload),
            userId: user._id,
            name: dataUser.name,
            boxes: boxes
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [trainers_service_1.TrainersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map