// src/equipe/entities/match-equipe.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Equipe } from './equipes.entity'; // Import de l'entité Equipe
import { Match } from '../../match/entities/match.entity'; // Import de l'entité Match

@Entity('matchs_equipes')
export class MatchEquipe {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation ManyToOne avec Match
  @ManyToOne(() => Match, match => match.matchEquipes)
  match: Match;

  // Relation ManyToOne avec Equipe
  @ManyToOne(() => Equipe, equipe => equipe.matchEquipes)
  equipe: Equipe;

  
}