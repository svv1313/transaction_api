import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.provider';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, ...authProviders],
  imports: [DatabaseModule],
  controllers: [AuthController],
})
export class AuthModule {}
