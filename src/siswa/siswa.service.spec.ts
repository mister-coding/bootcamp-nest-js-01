import { Test, TestingModule } from '@nestjs/testing';
import { SiswaService } from './siswa.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SiswaService', () => {
  let service: SiswaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiswaService,PrismaService],
    }).compile();

    service = module.get<SiswaService>(SiswaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
