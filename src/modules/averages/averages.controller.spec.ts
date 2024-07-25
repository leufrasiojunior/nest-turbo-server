import { Test, TestingModule } from '@nestjs/testing';
import { AveragesController } from './averages.controller';
import { AveragesService } from './averages.service';

describe('AveragesController', () => {
  let controller: AveragesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AveragesController],
      providers: [AveragesService],
    }).compile();

    controller = module.get<AveragesController>(AveragesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
