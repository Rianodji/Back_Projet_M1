import { Test, TestingModule } from '@nestjs/testing';
import { OfficielsService } from './officiels.service';

describe('OfficielsService', () => {
  let service: OfficielsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficielsService],
    }).compile();

    service = module.get<OfficielsService>(OfficielsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
