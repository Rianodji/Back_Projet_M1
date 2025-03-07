// src/journee/entities/journee.entity.ts
import {
     Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne
 } from 'typeorm';
import { Saison } from '../../saison/entities/saison.entity'; // Import de l'entité Saison

@Entity('journees') // Table 'journees' dans la base de données
export class Journee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number; // Numéro de la journée (ex : 1, 2, 3, etc.)

  @Column({ type: 'date' })
  debut: string; // Date de début de la journée

  @Column({ type: 'date' })
  fin: string; // Date de fin de la journée

  // Relation ManyToOne avec Saison (une journée appartient à une seule saison)
  @ManyToOne(() => Saison, saison => saison.journees)
  saison: Saison;
}