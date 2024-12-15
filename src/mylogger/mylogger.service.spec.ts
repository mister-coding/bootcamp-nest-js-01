import { Test, TestingModule } from '@nestjs/testing';
import { MyloggerService } from './mylogger.service';

describe('MyloggerService', () => {
  let service: MyloggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyloggerService],
    }).compile();

    service = module.get<MyloggerService>(MyloggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
