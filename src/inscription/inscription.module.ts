import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity'; 
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { EquipesModule } from '../equipes/equipes.module';
import { JoueurModule } from '../joueur/joueur.module';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from 'casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscription]),
    forwardRef(()=>EquipesModule),
    forwardRef(()=>JoueurModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=> CaslModule)
  ],
  controllers: [InscriptionController],
  providers: [InscriptionService],
  exports:[InscriptionService, TypeOrmModule.forFeature([Inscription])]
})
export class InscriptionModule {}