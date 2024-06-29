import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: () => void) {
    console.log("From Middleware");
    
    // if (!req.headers.authorization){
    //   throw new UnauthorizedException()
    // }
    // new Logger().warn(`Request ${new Date().toISOString()} ${req.method} ${req.url}`)
    next();
  }

}
