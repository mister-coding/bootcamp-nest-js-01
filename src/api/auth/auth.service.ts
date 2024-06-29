import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: AuthRegisterDto) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new ConflictException('Email already exists');
    }
    const createUser = await this.prisma.user.create({
      data: data,
    });
    return {
      email: createUser.email,
    };
  }

  async login(data: AuthLoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email not exists');
    }

    const checkPassword = await bcrypt.compare(data.password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      userLevel: user.userLevel,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async profile(user_id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
      select:{
        name: true,
        email: true,
        phone: true,
        address: true,
        userLevel: true
      }
    });
    if (!user) {
      throw new NotFoundException('User not exists');
    }
    return user;
  }
}
