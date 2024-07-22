import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id')
  async user(@Param() params: { id: string }): Promise<User> {
    try {
      const id = parseInt(params.id) as number;
      const user = await this.usersService.findOneById(id);
      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
