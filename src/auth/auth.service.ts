import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SignUpDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async signUp(body: SignUpDTO): Promise<User> {
    const isUserExist = await this.findOneByEmail(body.email);
    if (isUserExist) {
      throw new ConflictException('User already exists');
    }
    const now = new Date();
    // Hash password
    const newUser = new User();
    const saltRounds = 10;
    const hash = await bcrypt.hash(body.password, saltRounds);
    newUser.email = body.email;
    newUser.password = hash;
    newUser.name = body.name;
    newUser.isActive = true;
    newUser.age = body.age;
    newUser.role = body.role;
    newUser.createdAt = now;
    newUser.updatedAt = now;

    return this.usersRepository.save(newUser);
  }

  async signIn(body: SignUpDTO): Promise<User> {
    const user = await this.findOneByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password not match');
    }

    return user;
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
}
