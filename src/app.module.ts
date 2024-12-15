import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SiswaModule } from './siswa/siswa.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { UserController } from './user/user.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import dbConfig from './config/db.config';
import { MyloggerModule } from './mylogger/mylogger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    UserModule,
    SiswaModule,
    MahasiswaModule,
    ApiModule,
    MyloggerModule.init(
      'https://dffe70df37f43589f730dc88815b91c4@o4507559168704512.ingest.us.sentry.io/4507559172898816',
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
