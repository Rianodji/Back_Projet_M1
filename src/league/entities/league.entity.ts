// src/league/entities/league.entity.ts
import { 
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  OneToMany,
  ManyToOne
  } from 'typeorm';
import { Saison } from '../../saison/entities/saison.entity'; // Import de l'entité Saison
import { User } from '../../users/entities/user.entity';  // Import de User
import { Arbitre } from '../../arbitre/entities/arbitre.entity'; // Import de Arbitre
import { Equipe } from '../../equipes/entities/equipes.entity'; // Import de Equipe

@Entity() 
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  display_name: string;

  @Column()
  country: string;

  @Column({ type: 'date' })
  date_creation: Date;


  // Relation ManyToOne avec User (une ligue appartient à un seul utilisateur)
  @ManyToOne(() => User, (user) => user.leagues)
  user: User;

  // Relation OneToMany avec Saison
  @OneToMany(() => Saison, saison => saison.league)
  saisons: Saison[];
  
  // Ajout de la relation entre League et Arbitre
  @OneToMany(() => Arbitre, arbitre => arbitre.league)
  arbitres: Arbitre[];
  // relation oneToMany avec equipe
  @OneToMany(() => Equipe, equipe => equipe.league)
  equipes: Equipe[];

}