import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/auth.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async user(@Body() body: SignUpDTO): Promise<string> {
    try {
      await this.authService.signUp(body);
      return 'Success';
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Post('/sigin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() body: SignUpDTO): Promise<string> {
    try {
      await this.authService.signIn(body);
      return 'Success';
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
