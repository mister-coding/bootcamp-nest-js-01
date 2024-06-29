import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get users', async () => {
    const expectResults = [
      {
        name: 'John',
      },
      {
        name: 'Edy22',
      },
    ];
    jest.spyOn(service, 'getListUser').mockResolvedValue(expectResults);
    const results = await service.getListUser();
   
    expect(expectResults).toEqual(results);
  });
});
