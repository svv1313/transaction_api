import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('Starting server...');

  const env = process.env.NODE_ENV;
  let app = null;

  if (env === 'production') {
    const httpsOptions = {
      key: readFileSync('src/secrets/key.pem'),
      cert: readFileSync('src/secrets/cert.pem'),
    };
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
