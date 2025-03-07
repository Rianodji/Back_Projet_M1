// src/league/entities/league.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Saison } from '../../saison/entities/saison.entity'; // Import de l'entité Saison

@Entity('leagues') // Table 'leagues' dans la base de données
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  display_name: string;

  @Column()
  country: string;

  @Column({ type: 'date' })
  date_creation: string;

  // Relation OneToMany avec Saison
  @OneToMany(() => Saison, saison => saison.league)
  saisons: Saison[];
}