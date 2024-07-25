import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto/auth.dto';
import { Response } from 'express';

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

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() body: SignInDTO, @Res() res: Response) {
    try {
      const tokens = await this.authService.signIn(body);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true, // TODO: Need to use cookie only in prod
        sameSite: 'strict',
      });

      res.send({ accessToken: tokens.accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }

  @Post('/refresh')
  async refresh(@Res() res: Response) {
    try {
      const refreshToken = res.req.cookies['refreshToken'];
      const accessToken = await this.authService.refresh(refreshToken);
      res.send({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }
}
