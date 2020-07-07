import { Controller, Get, UseGuards, Post, Request, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiProperty } from '@nestjs/swagger';
@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'To log user.' })
  @ApiResponse({ status: 201, description: 'Return access token.', type: String })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
