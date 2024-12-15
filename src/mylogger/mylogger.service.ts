import { ConsoleLogger, Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class MyloggerService extends ConsoleLogger {

  private static myloggerServiceInstance: MyloggerService;

  constructor(){
    super();
  }

  public static MyloggerServiceInstance(): MyloggerService {
    if (!MyloggerService.myloggerServiceInstance) {
        MyloggerService.myloggerServiceInstance = new MyloggerService();
    }
    return MyloggerService.myloggerServiceInstance;
  }

  log(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    Sentry.withScope((scope) => {
      scope.setLevel('log');
      scope.setTag('tag', 'product');
      scope.setContext('Product', {
        product: 'product error page',
      });
      Sentry.captureMessage(message, 'log');
    });
  }
  error(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    Sentry.withScope((scope) => {
      scope.setLevel('error');
      scope.setTag('tag', 'product');
      scope.setExtra('message', optionalParams);
      //   scope.captureException(message);
      scope.addBreadcrumb({
        message,
        level: 'warning',
        data: {
          test: 'COCOCOCOCOCOCOOCOC',
        },
      });
      scope.setContext('Product', {
        product: 'product error page',
      });
      Sentry.captureMessage(message, 'error');
    });
  }
  warn(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    Sentry.captureMessage(message, 'warning');
  }
  debug(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    Sentry.captureMessage(message, 'debug');
  }
  verbose(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    Sentry.captureMessage(message, 'info');
  }
  fatal(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    Sentry.captureMessage(message, 'fatal');
  }
}
