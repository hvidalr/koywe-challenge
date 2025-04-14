import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/server/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './app/server/exceptions.filter';
import config from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionsFilter());

  const documentBuilder = new DocumentBuilder()
    .setTitle('Currency Quote API')
    .setDescription('API to create and get quotes between currencies.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
}

bootstrap();
