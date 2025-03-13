import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany 
} from 'typeorm';
import { Journee } from '../../journee/entities/journee.entity'; // Import de l'entité Journee
import { MatchEquipe } from '../../equipes/entities/match-equipe.entity'; // Import de la table d'association
import { MatchArbitre } from './match-arbitre.entity'; // Import de la table d'association
import { Selection } from '../../selection/entities/selection.entity'; // Import de l'entité Selection




// Définition de l'énumération Status
export enum Status {
  EN_COURS = 'en_cours',
  TERMINE = 'termine',
  ANNULE = 'annule',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score_equipe1: number;

  @Column()
  score_equipe2: number;

  @CreateDateColumn()
  date: Date;

  // Relation ManyToOne avec Journee
  @ManyToOne(() => Journee, journee => journee.matchs)
  journee: Journee;

  // Attribut status qui est une énumération
  @Column({ type: 'enum', enum: Status })
  status: Status;

  @UpdateDateColumn()
  updated_at: Date; // Date de la dernière mise à jour du match

  // Relation OneToMany avec MatchEquipe
  @OneToMany(() => MatchEquipe, matchEquipe => matchEquipe.match)
  matchEquipes: MatchEquipe[];

  // Relation OneToMany avec MatchArbitre
  @OneToMany(() => MatchArbitre, matchArbitre => matchArbitre.match)
  matchArbitres: MatchArbitre[];

  // Relation OneToMany avec Selection
  @OneToMany(() => Selection, selection => selection.match)
  selections: Selection[];
}