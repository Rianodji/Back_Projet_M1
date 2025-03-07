<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';

@Module({
  controllers: [InscriptionController],
  providers: [InscriptionService]
=======
import { forwardRef, Module } from '@nestjs/common';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { SaisonModule } from 'saison/saison.module';

@Module({
  controllers: [InscriptionController],
  providers: [InscriptionService],
  imports:[
    TypeOrmModule.forFeature([Inscription]),
    forwardRef(()=>SaisonModule)
  ],
  exports: [InscriptionService]
>>>>>>> match_joueur
})
export class InscriptionModule {}
