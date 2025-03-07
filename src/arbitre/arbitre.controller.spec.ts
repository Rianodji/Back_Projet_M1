import { Test, TestingModule } from '@nestjs/testing';
import { ArbitreController } from './arbitre.controller'; 

describe('ArbitresController', () => {  
  let controller: ArbitreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArbitreController], 
    }).compile();

    controller = module.get<ArbitreController>(ArbitreController); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});




 