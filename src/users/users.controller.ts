import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from '@svv1313/be-services-lib';

@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async user(@Res() res: Response): Promise<void> {
    try {
      const { id: userId } = res.req.user;
      const user = await this.usersService.findOneById(userId);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }
}
