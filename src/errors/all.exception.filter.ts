import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as config from 'config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // noinspection FunctionTooLongJS,OverlyComplexFunctionJS
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // noinspection OverlyComplexBooleanExpressionJS
    const requestId = request?.locals?.requestId || 'EXCEPTION_FILTER';
    const responseObject: any = {
      success: false,
      apiVersion: config.get('version'),
      timestamp: new Date(),
      requestId,
    };

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // noinspection IfStatementWithTooManyBranchesJS
    if (status === HttpStatus.BAD_REQUEST) {
      responseObject.statusCode = status;
      responseObject.error = 'Validation Error';
      responseObject.message = exception?.response?.message;
    } else if (status === HttpStatus.I_AM_A_TEAPOT) {
      responseObject.statusCode = exception.response.statusCode;
      responseObject.error = exception.response.error;
      status = HttpStatus.BAD_REQUEST;
    } else if (status === HttpStatus.UNAUTHORIZED) {
      responseObject.statusCode = status;
      responseObject.error = 'Unauthorized';
    } else if (status === HttpStatus.NOT_FOUND) {
      responseObject.statusCode = status;
      responseObject.error = 'Not Found';
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      responseObject.statusCode = status;
      responseObject.error = 'Internal Server Error';
    }

    response.status(status).json(responseObject);
  }
}
