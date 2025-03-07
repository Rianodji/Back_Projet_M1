import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

