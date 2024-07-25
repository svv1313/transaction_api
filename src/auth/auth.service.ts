import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { SignInDTO, SignUpDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { REFRESH_TOKEN_EXPIRES_IN, TOKEN_EXPIRES_IN } from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async signIn(
    body: SignInDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.findOneByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong user credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: TOKEN_EXPIRES_IN,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<string> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const accessToken = await this.generateAccessToken(payload.userId);

    return accessToken;
  }

  private async generateAccessToken(userId: number): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return this.jwtService.sign(payload, {
      expiresIn: TOKEN_EXPIRES_IN,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
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

    return currentUser;
  }
}
