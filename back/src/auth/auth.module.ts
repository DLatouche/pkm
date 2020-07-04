import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TrainersModule } from 'src/trainers/trainers.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TrainersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1d'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
