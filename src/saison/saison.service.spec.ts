import { Test, TestingModule } from '@nestjs/testing';
import { SaisonService } from './saison.service';

describe('SaisonService', () => {
  let service: SaisonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaisonService],
    }).compile();

    service = module.get<SaisonService>(SaisonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
