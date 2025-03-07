import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Officiel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  prenom: string;

  @Column({ type: 'enum', enum: ['role1', 'role2', 'role3'] })  // Remplacez par les valeurs de l'énum selon votre besoin
  role: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  // Méthode pour retourner un officiel avec les champs spécifiés
  toResponseObject(): Partial<Officiel> {
    return {
      id: this.id,
      nom: this.nom,
      prenom: this.prenom,
      role: this.role,
      dateCreation: this.dateCreation,
      updatedAt: this.updatedAt,
    };
  }
}
