import { TrainersService } from 'src/trainers/trainers.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private trainersService;
    private jwtService;
    constructor(trainersService: TrainersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
