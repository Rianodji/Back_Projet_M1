import {
   Entity,
   PrimaryGeneratedColumn,
   Column, CreateDateColumn, 
   UpdateDateColumn,
   OneToMany
  } from 'typeorm';
import { Arbitrage } from '../../saison/entities/arbitrage.entity';
import { MatchArbitre } from '../../match/entities/match-arbitre.entity'; // Import de la table d'association



@Entity()
export class Arbitre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string; // Nom de l'arbitre

  @CreateDateColumn()
  created_at: Date; // Date de création de l'arbitre, automatiquement remplie par TypeORM

  @UpdateDateColumn({ nullable: true })
  updated_at: Date; // Date de la dernière mise à jour de l'arbitre, peut être null

  @OneToMany(() => Arbitrage, arbitrage => arbitrage.arbitre)
  arbitrages: Arbitrage[];

  // Relation OneToMany avec MatchArbitre
  @OneToMany(() => MatchArbitre, matchArbitre => matchArbitre.arbitre)
  matchArbitres: MatchArbitre[];
}
