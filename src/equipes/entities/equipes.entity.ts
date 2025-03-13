import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany 
} from 'typeorm';
import { Inscription } from '../../inscription/entities/inscription.entity'; // Import de l'entité Inscription
import { MatchEquipe } from './match-equipe.entity'; // Import de la table d'association
import { Selection } from '../../selection/entities/selection.entity'; // Import de l'entité Selection
//import { Staff } from '../../staff/entities/staff.entities';



@Entity()
export class Equipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  ville: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  // Relation OneToMany avec Inscription
  @OneToMany(() => Inscription, inscription => inscription.equipe)
  inscriptions: Inscription[];

  // Relation OneToMany avec MatchEquipe
  @OneToMany(() => MatchEquipe, matchEquipe => matchEquipe.equipe)
  matchEquipes: MatchEquipe[];

  // Relation OneToMany avec Selection
  @OneToMany(() => Selection, selection => selection.equipe)
  selections: Selection[];

  
}
