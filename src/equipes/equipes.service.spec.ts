import { Test, TestingModule } from '@nestjs/testing';
import { EquipesService } from './equipes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Equipe } from './entities/equipes.entity';
import { User } from '../users/entities/user.entity';

describe('EquipeService', () => {
  let service: EquipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipesService,
        {
          provide: getRepositoryToken(Equipe),
          useValue: {}, // Mock repository for Equipe
        },
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Mock repository for User
        },
      ],
    }).compile();

    service = module.get<EquipesService>(EquipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
