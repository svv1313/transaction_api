import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...usersProviders, ConfigService, JwtService],
      imports: [DatabaseModule],
      controllers: [UsersController],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
