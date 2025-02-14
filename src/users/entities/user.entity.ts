import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()  // Cette annotation crée une table de jonction entre User et Role
  roles: Role[];

  @Column({ nullable: true })
  last_password: string; // Pour enregistrer le hash du dernier mot de passe

  @CreateDateColumn()
  created_at: Date; // Date de création de l'utilisateur, automatiquement remplie par TypeORM

  @UpdateDateColumn({ nullable: true })
  updated_at: Date; // Date de la dernière mise à jour de l'utilisateur, peut être null

  @Column({ nullable: true })
  last_login: Date; // Date du dernier login de l'utilisateur, peut être null

    // Méthode pour retourner un utilisateur avec les champs spécifiés
    toResponseObject(): Partial<User> {
      return {
        id: this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
      };
    }
}