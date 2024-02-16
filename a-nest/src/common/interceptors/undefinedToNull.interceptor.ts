import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 전 부분 (컨트롤러 전)
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
    //.pipe() 부분이 컨트롤러 후 부분
  }
}
