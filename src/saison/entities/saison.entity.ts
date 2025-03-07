// src/saison/entities/saison.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { League } from '../../league/entities/league.entity'; // Import de l'entité League

@Entity('saisons') // Table 'saisons' dans la base de données
export class Saison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  debut: string;

  @Column({ type: 'date' })
  fin: string;

  @Column()
  nb_equipe: number;

  @Column()
  nb_arbitre: number;

  @Column()
  nb_remplacement: number;

  // Relation ManyToOne avec League
  @ManyToOne(() => League, league => league.saisons)
  league: League;
}