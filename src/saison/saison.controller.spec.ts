import { Test, TestingModule } from '@nestjs/testing';
import { SaisonController } from './saison.controller';

describe('SaisonController', () => {
  let controller: SaisonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaisonController],
    }).compile();

    controller = module.get<SaisonController>(SaisonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
