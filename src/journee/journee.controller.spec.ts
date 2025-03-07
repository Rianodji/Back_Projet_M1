import { Test, TestingModule } from '@nestjs/testing';
import { JourneeController } from './journee.controller';

describe('JourneeController', () => {
  let controller: JourneeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneeController],
    }).compile();

    controller = module.get<JourneeController>(JourneeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
