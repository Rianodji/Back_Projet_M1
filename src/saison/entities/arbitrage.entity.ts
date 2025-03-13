// src/saison/entities/arbitrage.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    Unique 
  } from 'typeorm';
  import { Arbitre } from '../../arbitre/entities/arbitre.entity';
  import { Saison } from './saison.entity';
  
  @Entity()
  @Unique(['arbitre', 'saison']) // Un arbitre ne peut être ajouté qu'une seule fois par saison
  export class Arbitrage {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'date' })
    date: Date;
  
    @ManyToOne(() => Arbitre, arbitre => arbitre.arbitrages, { eager: true })
    arbitre: Arbitre;
  
    @ManyToOne(() => Saison, saison => saison.arbitrages, { onDelete: 'CASCADE' })
    saison: Saison;
  }