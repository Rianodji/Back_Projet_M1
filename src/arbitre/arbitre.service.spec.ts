import { Test, TestingModule } from '@nestjs/testing';
import { ArbitreController } from './arbitre.controller';
import { ArbitreService } from './arbitre.service';

describe('ArbitreController', () => {
  let controller: ArbitreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArbitreController],
      providers: [ArbitreService],
    }).compile();

    controller = module.get<ArbitreController>(ArbitreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
