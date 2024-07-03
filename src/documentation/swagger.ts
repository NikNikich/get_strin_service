import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import * as ERRORS from '../errors/errors';
import HTTP_CODE_DESCRIPTION from './http.description';

export function configureSwagger(app: INestApplication): void {
  const server: string = config.get('swagger.server');
  if (config.get('swagger.enable')) {
    const errors = Object.entries(ERRORS).map(
      ([, err]) => `    #${err.getCode()}. ${err.getMessage()}`,
    );
    const options = new DocumentBuilder()
      .setTitle('GetString')
      .addBearerAuth()
      .setDescription(
        'Server started at: ' +
          new Date().toISOString() +
          ' (UTC) \n' +
          HTTP_CODE_DESCRIPTION +
          ' \n  \n' +
          'Далее описаны все настраиваемые ошибки: \n \n' +
          errors.join('\n') +
          '',
      )
      .setVersion(process.env.REST_IMAGE_NAME || 'PLEASE SET ENV TAG')
      .addServer(server)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.get('swagger.path'), app, document, {
      swaggerOptions: {
        displayRequestDuration: 'true',
      },
    });
  }
}
