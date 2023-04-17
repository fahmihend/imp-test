import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthDto,
} from 'src/dto/auth.dto';
import { response, responseError } from 'src/helper/response.helper';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() params: AuthDto) {
    try {
      const result = await this.authService.register(params);
      return response('Success', result);
    } catch (e) {
      let code;
      if (e.message === 'Username already exist') code = 409
      return responseError(e.message, code);
    }
  }

  @Post('login')
  async login(@Body() params: AuthDto) {
    try {
      const result = await this.authService.login(params);
      return response('Success', result);
    } catch (e) {
      return responseError(e.message, 400);
    }
  }
}
