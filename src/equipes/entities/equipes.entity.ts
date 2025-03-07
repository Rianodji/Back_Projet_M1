import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  // Méthode pour retourner une équipe avec les champs spécifiés
  toResponseObject(): Partial<Equipe> {
    return {
      id: this.id,
      nom: this.nom,
      ville: this.ville,
      dateCreation: this.dateCreation,
      updatedAt: this.updatedAt,
    };
  }
}
