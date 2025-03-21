import { Test, TestingModule } from '@nestjs/testing';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { Equipe } from './entities/equipes.entity';

describe('EquipeController', () => {
  let controller: EquipesController;
  let service: EquipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipesController], 
      providers: [EquipesService], 
    }).compile();

    controller = module.get<EquipesController>(EquipesController); 
    service = module.get<EquipesService>(EquipesService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); 
  });

  it('should return all teams', async () => {
    
   // const result: Equipe[] = [{ id: 1, nom: 'Equipe A', ville: 'Paris', dateCreation: new Date() }];// sinon errreur : Le type '{ id: number; nom: string; ville: string; dateCreation: Date; }' n'a pas les propriétés suivantes du type 'Equipe': updatedAt, inscriptions, matchEquipes, selections
   const result: Partial<Equipe>[] = [{
    id: 1,
    nom: 'Equipe A',
    ville: 'Paris',
    dateCreation: new Date(),
  }];
  
  jest.spyOn(service, 'findAll').mockResolvedValue(result as Equipe[]);
    expect(await controller.findAll()).toBe(result); 
  });
});
