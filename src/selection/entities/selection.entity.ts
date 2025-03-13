// src/selection/entities/selection.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from '../../match/entities/match.entity'; // Import de l'entité Match
import { Joueur } from '../../joueur/entities/joueur.entity'; // Import de l'entité Joueur
import { Equipe } from '../../equipes/entities/equipes.entity'; // Import de l'entité Equipe
import { SelectionType } from '../enums/selection-type.enum'; // Import de l'énumération SelectionType
import { Post } from '../enums/post.enum'; // Import de l'énumération Post

@Entity()
export class Selection {
  @PrimaryGeneratedColumn()
  id: number;

  // Type de la sélection : Titulaire ou Remplaçant
  @Column({
    type: 'enum',
    enum: SelectionType,
  })
  selection_type: SelectionType;

  // Nombre de buts
  @Column({ type: 'int', default: 0 })
  nb_but: number;

  // Nombre de passes décisives
  @Column({ type: 'int', default: 0 })
  nb_passe: number;

  // Nombre de cartons jaunes
  @Column({ type: 'int', default: 0 })
  nb_carton_jaune: number;

  // Nombre de cartons rouges
  @Column({ type: 'int', default: 0 })
  nb_carton_rouge: number;

  // Poste du joueur (Attaquant, Défenseur, etc.)
  @Column({
    type: 'enum',
    enum: Post,
  })
  post: Post;

  // Relation ManyToOne avec Match
  @ManyToOne(() => Match, match => match.selections)
  match: Match;

  // Relation ManyToOne avec Joueur
  @ManyToOne(() => Joueur, joueur => joueur.selections)
  joueur: Joueur;

  // Relation ManyToOne avec Equipe
  @ManyToOne(() => Equipe, equipe => equipe.selections)
  equipe: Equipe;
}