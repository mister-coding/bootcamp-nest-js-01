import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    new Logger(AppController.name).error("Error Testing Nest JS HAHAHA","Error karena ada sesuatu yang tidak diketahui")
    return {
      status: true,
      message: "Hello"
    }
  }

  @Get('/hello2')
  getHello2(): string {
    return this.appService.getHello2();
  }

}
