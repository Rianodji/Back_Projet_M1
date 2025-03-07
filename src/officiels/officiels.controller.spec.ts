import { Test, TestingModule } from '@nestjs/testing';
import { OfficielsController } from './officiels.controller';

describe('OfficielsController', () => {
  let controller: OfficielsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficielsController],
    }).compile();

    controller = module.get<OfficielsController>(OfficielsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
