import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, delay, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before.....");
    const now = new Date().getMilliseconds();

    return next.handle().pipe(
      tap((data)=>{
        console.log(`After..... ${new Date().getMilliseconds()-now}ms`);
      })
    )
  }
}
