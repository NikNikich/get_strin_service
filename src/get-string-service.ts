import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import { configureSwagger } from './documentation/swagger';
import { AllExceptionsFilter } from './errors/all.exception.filter';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    // logger: new MyLogger(),
  });
  const logger = new Logger('Bootstrap');

  configureSwagger(app);

  const port: number = Number(process.env.PORT) || config.get('server.port');
  app.enableCors({
    allowedHeaders: [
      'Cache-Control',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'x-api-token',
      'Access-Control-Allow-Headers',
      'Access-Control-Request-Method',
      'Authorization',
      'Authorized',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    maxAge: 60 * 60 * 24 * 365,
    preflightContinue: false,
  });
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);

  logger.log(
    `Swagger: ${config.get('server.url')}:${config.get(
      'server.port',
    )}/${config.get('swagger.path')}`,
  );
}
bootstrap();
