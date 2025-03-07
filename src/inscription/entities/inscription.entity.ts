// src/inscription/entities/inscription.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Saison } from '../../saison/entities/saison.entity'; // Import de l'entité Saison

@Entity('inscriptions') // Table 'inscriptions' dans la base de données
export class Inscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  debut: string; // Date de début de l'inscription

  @Column({ type: 'date' })
  fin: string; // Date de fin de l'inscription

  // Relation ManyToOne avec Saison (une inscription appartient à une seule saison)
  @ManyToOne(() => Saison, saison => saison.inscriptions)
  saison: Saison;
}