import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface APIResponse<T> {
  success: boolean;
  status: string;
  data: T;
  message?: string;
  timestamp: string;
}

@Injectable()
export class APIResponseInterceptor<T>
  implements NestInterceptor<T, APIResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<APIResponse<T>> {
    const res = context.switchToHttp().getResponse();
    const statusCode = res.statusCode;
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        status: statusCode,
        data: data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
