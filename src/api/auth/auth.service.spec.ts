import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { userLevel } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from './dto/auth-login.dto';

const mockUser = {
  id: 1,
  name: 'john',
  email: 'john@gmail.com',
  password: '123456',
  phone: '123456',
  address: 'address',
  userLevel: userLevel.Member,
  data: {},
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AuthService', () => {
  let service: AuthService;
  let primsaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    primsaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('pengecekan email sudah ada', async () => {
      jest
        .spyOn(await primsaService.user, 'findFirst')
        .mockResolvedValue(mockUser);
      const data: AuthRegisterDto = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
        address: mockUser.address,
        phone: mockUser.phone,
      };
      await expect(service.register(data)).rejects.toThrow(
        new ConflictException('Email already exists'),
      );
    });

    it('Buat user baru', async () => {
      jest.spyOn(await primsaService.user, 'findFirst').mockResolvedValue(null);
      jest
        .spyOn(await primsaService.user, 'create')
        .mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hash12345678');

      const data: AuthRegisterDto = {
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
        address: mockUser.address,
        phone: mockUser.phone,
      };
      const result = await service.register(data);
      expect(result).toEqual({
        email: mockUser.email,
      });
    });
  });

  describe('login', () => {
    it('pengecekan email belum ada', async () => {
      jest.spyOn(await primsaService.user, 'findFirst').mockResolvedValue(null);
      const data: AuthLoginDto = {
        email: mockUser.email,
        password: mockUser.password,
      };
      await expect(service.login(data)).rejects.toThrow(
        new UnauthorizedException('Email not exists'),
      );
    });

    it('pengecekan password false', async () => {
      jest
        .spyOn(await primsaService.user, 'findFirst')
        .mockResolvedValue(mockUser);
      const data: AuthLoginDto = {
        email: mockUser.email,
        password: mockUser.password,
      };
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      await expect(service.login(data)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials'),
      );
    });

    it('pengecekan password true', async () => {
      jest
        .spyOn(await primsaService.user, 'findFirst')
        .mockResolvedValue(mockUser);
      const data: AuthLoginDto = {
        email: mockUser.email,
        password: mockUser.password,
      };
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('accessToken');
      const resault = await service.login(data);

      await expect(resault).toEqual({ accessToken: 'accessToken' });
    });
  });

  describe('profile', () => {
    it('pengecekan user tidak ada', async () => {
      jest.spyOn(await primsaService.user, 'findFirst').mockResolvedValue(null);
      await expect(service.profile(mockUser.id)).rejects.toThrow(
        new NotFoundException('User not exists'),
      );
    });

    it('pengecekan user ada', async () => {
      jest
        .spyOn(await primsaService.user, 'findFirst')
        .mockResolvedValue(mockUser);
      const result = await service.profile(mockUser.id);
      expect(result).toEqual(mockUser);
    });
    
  });
});
