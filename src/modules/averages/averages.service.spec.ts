import { Test, TestingModule } from '@nestjs/testing';
import { AveragesService } from './averages.service';

describe('AveragesService', () => {
  let service: AveragesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AveragesService],
    }).compile();

    service = module.get<AveragesService>(AveragesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
