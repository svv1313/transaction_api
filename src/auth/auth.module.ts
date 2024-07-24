import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.provider';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, ...authProviders, ConfigService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
