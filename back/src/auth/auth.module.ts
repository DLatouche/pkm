import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TrainersModule } from 'src/trainers/trainers.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './conastants';

@Module({
  imports: [TrainersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1d'}
  })],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
