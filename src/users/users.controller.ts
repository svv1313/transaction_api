import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  async create(@Body() user: User): Promise<User> {
    try {
      const newUser = await this.usersService.create(user);
      return newUser;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
