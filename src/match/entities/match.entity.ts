import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('matchs')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  journee_id: number;

  @Column()
  equipe1_id: number;

  @Column()
  equipe2_id: number;

  @Column()
  score_equipe1: number;

  @Column()
  score_equipe2: number;

  @Column()
  date: Date;
}

