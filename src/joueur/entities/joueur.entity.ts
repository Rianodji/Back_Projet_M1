import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  OneToMany
} from 'typeorm';
import { Inscription } from '../../inscription/entities/inscription.entity'; // Import de l'entité Inscription
import { Selection } from '../../selection/entities/selection.entity'; // Import de l'entité Selection
import { Indisponibilite } from './indisponibilite.entity';




@Entity()
export class Joueur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  date_naissance: string;

  @Column()
  post: string;  // Par exemple, Attaquant, Défenseur, etc.

  // Relation OneToMany avec Inscription
  @OneToMany(() => Inscription, inscription => inscription.joueur)
  inscriptions: Inscription[];

  // Relation OneToMany avec Selection
  @OneToMany(() => Selection, selection => selection.joueur)
  selections: Selection[];

  // Relation OneToMany avec Indisponibilite
  @OneToMany(() => Indisponibilite, indisponibilite => indisponibilite.joueur)
  indisponibilites: Indisponibilite[];
}

