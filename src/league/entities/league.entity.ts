// src/league/entities/league.entity.ts
import { Entity,
   PrimaryGeneratedColumn,
    Column, 
    OneToMany,
    ManyToOne
  } from 'typeorm';
import { Saison } from '../../saison/entities/saison.entity'; // Import de l'entité Saison
import { User } from '../../users/entities/user.entity';  // Import de User


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


  // Relation ManyToOne avec User (une ligue appartient à un seul utilisateur)
  @ManyToOne(() => User, user => user.leagues)
  user: User;

  // Relation OneToMany avec Saison
  @OneToMany(() => Saison, saison => saison.league)
  saisons: Saison[];
}