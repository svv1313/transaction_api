import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [...databaseProviders, ConfigService],
  exports: [...databaseProviders],
  imports: [ConfigModule.forRoot()],
})
export class DatabaseModule {}
