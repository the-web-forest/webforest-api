import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export default class ErrorsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorsInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        try {
          this.logger.error(err);
          const errorPayload = JSON.parse(err.message);
          this.logger.error('Erro');
          this.logger.error(errorPayload);
          return throwError(() => new BadRequestException(errorPayload));
        } catch (error) {
          this.logger.error(error);
          return throwError(() => err);
        }
      }),
    );
  }
}
