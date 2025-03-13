import { forwardRef, Module } from '@nestjs/common';
//import { ArbitreService } from './arbitre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arbitre } from './entities/arbitre.entity';
import { SanitizerModule } from '../sanitizer/sanitizer.module';
//import { ArbitreController } from './arbitre.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  //providers: [ArbitreService], // Service pour gérer la logique métier des arbitres
  //exports: [ArbitreService, TypeOrmModule.forFeature([Arbitre])],  // Exporte ArbitresService et l'entité Arbitre pour les utiliser dans d'autres modules
  imports: [
    TypeOrmModule.forFeature([Arbitre]), // Fournit l'entité Arbitre à TypeORM
    forwardRef(() => SanitizerModule), // Utilisation de forwardRef pour résoudre la dépendance circulaire si nécessaire
    forwardRef(() => AuthModule), // Utilisation de forwardRef pour gérer la dépendance avec le module d'authentification
  ],
  //controllers: [ArbitreController], // Le contrôleur pour les routes liées aux arbitres
})
export class ArbitreModule {}
