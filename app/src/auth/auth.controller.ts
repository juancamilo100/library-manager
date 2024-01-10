// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') 
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<{ access_token: string }> {
    console.log('body', body)
    const access_token = await this.authService.login(body.username, body.password);
    return { access_token };
  }
}
