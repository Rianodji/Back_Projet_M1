// src/inscription/entities/inscription.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Saison } from '../../saison/entities/saison.entity'; // Import de l'entité Saison
import { Equipe } from '../../equipes/entities/equipes.entity'; // Import de l'entité Equipe
import { Joueur } from '../../joueur/entities/joueur.entity'; // Import de l'entité Joueur


@Entity() // Table 'inscriptions' dans la base de données
export class Inscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  debut: Date; // Date de début de l'inscription

  @Column({ type: 'date' })
  fin: Date; // Date de fin de l'inscription

  // Relation ManyToOne avec Saison (une inscription appartient à une seule saison)
  @ManyToOne(() => Saison, saison => saison.inscriptions)
  saison: Saison;

  // Relation ManyToOne avec Equipe (une inscription appartient à une seule équipe)
  @ManyToOne(() => Equipe, equipe => equipe.inscriptions)
  equipe: Equipe;

  // Relation ManyToOne avec Joueur (une inscription appartient à un seul joueur)
  @ManyToOne(() => Joueur, joueur => joueur.inscriptions)
  joueur: Joueur;
}