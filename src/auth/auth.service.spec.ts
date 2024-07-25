import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { authProviders } from './auth.provider';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, ...authProviders, ConfigService],
      imports: [
        DatabaseModule,
        JwtModule.register({
          global: true,
        }),
      ],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
