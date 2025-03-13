// src/matchs/entities/match-arbitre.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    Column 
} from 'typeorm';
import { Match } from './match.entity'; // Import de l'entité Match
import { Arbitre } from '../../arbitre/entities/arbitre.entity'; // Import de l'entité Arbitre

@Entity()
export class MatchArbitre {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation ManyToOne avec Match
  @ManyToOne(() => Match, match => match.matchArbitres)
  match: Match;

  // Relation ManyToOne avec Arbitre
  @ManyToOne(() => Arbitre, arbitre => arbitre.matchArbitres)
  arbitre: Arbitre;
}