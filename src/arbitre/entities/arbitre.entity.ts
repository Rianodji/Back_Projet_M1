import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Arbitre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string; // Nom de l'arbitre

  @CreateDateColumn()
  created_at: Date; // Date de création de l'arbitre, automatiquement remplie par TypeORM

  @UpdateDateColumn({ nullable: true })
  updated_at: Date; // Date de la dernière mise à jour de l'arbitre, peut être null

  // Méthode pour retourner un arbitre avec les champs spécifiés
  toResponseObject(): Partial<Arbitre> {
    return {
      id: this.id,
      nom: this.nom,
    };
  }
}
