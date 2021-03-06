import { Injectable } from '@nestjs/common';
import { TrainersService } from '../trainers/trainers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private trainersService: TrainersService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.trainersService.findByUsername(username)

        //TO DO encrypt password
        if (user && user.password == password) {
            return user
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        let dataUser = await this.trainersService.findById(user._id)
        console.log('auth.service.ts -> 23: dataUser', dataUser)
        let boxes = []
        dataUser.boxes.forEach((b) => {
            boxes.push({ id: b._id, pokemons: b.pokemons, name: b.name })
        })
        return {
            access_token: this.jwtService.sign(payload),
            userId: user._id,
            name: dataUser.name,
            boxes: boxes
        }
    }

}
