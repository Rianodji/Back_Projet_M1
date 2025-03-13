// src/joueur/entities/indisponibilite.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne 
} from 'typeorm';
import { Joueur } from './joueur.entity'; // Assurez-vous d'importer l'entité Joueur

@Entity() // Table 'indisponibilites' dans la base de données
export class Indisponibilite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  debut: Date; // Date de début de l'indisponibilité

  @Column({ type: 'date' })
  fin: Date; // Date de fin de l'indisponibilité

  @Column()
  raison: string; // Raison de l'indisponibilité (par exemple, blessure, suspension, etc.)

  // Relation ManyToOne avec Joueur (une indisponibilité appartient à un seul joueur)
  @ManyToOne(() => Joueur, joueur => joueur.indisponibilites)
  joueur: Joueur;
}