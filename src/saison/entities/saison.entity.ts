// src/saison/entities/saison.entity.ts
import { 
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  ManyToOne,
  OneToMany
  } from 'typeorm';
import { League } from '../../league/entities/league.entity'; // Import de l'entité League
import { Inscription } from '../../inscription/entities/inscription.entity'; // Import de Inscription
import { Journee } from '../../journee/entities/journee.entity'; // Import de Journee
import { Arbitrage } from './arbitrage.entity';



@Entity() // Table 'saisons' dans la base de données
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


  // Relation OneToMany avec Inscription (une saison peut avoir plusieurs inscriptions)
  @OneToMany(() => Inscription, inscription => inscription.saison)
  inscriptions: Inscription[];

  // Relation OneToMany avec Journee (une saison peut avoir plusieurs journées)
  @OneToMany(() => Journee, journee => journee.saison)
  journees: Journee[];

  // Relation OneToMany avec Arbitrage (une saison peut avoir plusieurs Arbitrages)
  @OneToMany(() => Arbitrage, arbitrage => arbitrage.saison)
  arbitrages: Arbitrage[];

}