import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    const users = await this.usersRepository.find({
      where: {
        id,
      },
    });

    const currentUser = users[0];
    delete currentUser.password;

    return currentUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const users = await this.usersRepository.find({
      where: {
        email,
      },
    });

    if (users.length === 0) {
      return null;
    }

    const currentUser = users[0];
    delete currentUser.password;

    return currentUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
