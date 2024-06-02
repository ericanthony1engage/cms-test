import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import ResponseUtil from '../utils/response.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let body: string | object;
    if (this.configService.get('NODE_ENV') === 'development') {
      body = exception.getResponse();
    } else {
      body = 'Internal Server Error';
    }

    const responses = new ResponseUtil(response);

    responses.setStatus(status).setError(body).send();
  }
}
