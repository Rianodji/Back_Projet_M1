import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Match } from '../match/entities/match.entity';
import { Saison } from '../saison/entities/saison.entity';
import { Journee } from '../journee/entities/journee.entity';
import { Joueur } from '../joueur/entities/joueur.entity';
import { Equipe } from '../equipes/entities/equipes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Saison, Journee, Joueur, Equipe])
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}

