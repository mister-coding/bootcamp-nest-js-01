import { Module, DynamicModule, Global } from '@nestjs/common';
import { MyloggerService } from './mylogger.service';
import * as Sentry from "@sentry/nestjs"

@Global()
@Module({
  providers: [MyloggerService]
})
export class MyloggerModule {
  static init(dsn:string):DynamicModule{
    Sentry.init({
      dsn: dsn,
      integrations: [
        
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
    
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
    });
    return {
      module: MyloggerModule,
      providers: [
        MyloggerService,
      ],
      exports: [MyloggerService],
    };
  }
}
