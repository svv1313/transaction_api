import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ...usersProviders],
  imports: [DatabaseModule],
  controllers: [UsersController],
})
export class UsersModule {}
