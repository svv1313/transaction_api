import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, ...usersProviders, ConfigService],
  imports: [DatabaseModule],
  controllers: [UsersController],
})
export class UsersModule {}
