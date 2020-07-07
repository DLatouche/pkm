import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';

describe('App Controller', () => {
  let appController: AppController;
  let authService: AuthService;


  beforeEach(async () => {
    authService = { login: jest.fn() } as any;
    appController = new AppController(authService);
  });

  describe('login', () => {
    it('should return an user', async () => {
      let result = "access_token";
      (authService.login as any).mockResolvedValue(result);
      expect(await appController.login({ username: "login", password: "password" })).toBe(result);
    });
  });
});
