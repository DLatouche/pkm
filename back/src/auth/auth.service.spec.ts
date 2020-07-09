import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TrainersService } from 'src/trainers/trainers.service';

describe('Types Controller', () => {
  let trainersService: TrainersService;
  let jwtService: JwtService;
  let authService: AuthService

  beforeEach(async () => {
    trainersService = { findByUsername: jest.fn()} as any;
    jwtService = { sign: jest.fn() } as any;
    authService = new AuthService(trainersService, jwtService);
  });

  describe('validateUser', () => {
    it('should validate a user', async () => {
      const result = { id: "id", password: "password" };
      (trainersService.findByUsername as any).mockReturnValue(result);
      expect(await authService.validateUser("username", "password")).toBe(result);
    });
  });

  describe('login', () => {
    it('should return an user', async () => {
      const result = {access_token: "lapin",  userId: undefined};

      (jwtService.sign as any).mockReturnValue("lapin");
      expect(await authService.login({username: "lapin", password: "lapin"})).toStrictEqual(result);
    });
  });


});

