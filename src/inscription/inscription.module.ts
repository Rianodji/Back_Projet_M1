import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity'; // Import de l'entité Inscription
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { EquipesModule } from 'equipes/equipes.module';
import { JoueurModule } from 'joueur/joueur.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscription]),
    forwardRef(()=>EquipesModule),
    forwardRef(()=>JoueurModule)
  ],
  controllers: [InscriptionController],
  providers: [InscriptionService],
  exports:[InscriptionService]
})
export class InscriptionModule {}