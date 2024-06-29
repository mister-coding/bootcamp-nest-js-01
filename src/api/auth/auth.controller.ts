import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { Roles } from '../../decorators/roles/roles.decorator';
import { userLevel } from '@prisma/client';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return {
      data: await this.authService.register(body),
      message: 'register user success',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return {
      data: await this.authService.login(body),
      message: 'login success',
    };
  }


  @Roles(userLevel.Admin, userLevel.Member)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("accessToken")
  @Get('profile')
  async profile(@Request() req) {
    return {
      data: await this.authService.profile(req.user.sub),
      message: 'get pfofile success',
    };
  }

  @Roles(userLevel.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile2')
  async profile2(@Request() req) {
    return {
      data: await this.authService.profile(req.user.sub),
      message: 'get pfofile success',
    };
  }
}
