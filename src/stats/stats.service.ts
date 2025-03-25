import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../match/entities/match.entity';
import { Saison } from '../saison/entities/saison.entity';
import { Journee } from '../journee/entities/journee.entity';
import { Joueur } from '../joueur/entities/joueur.entity';
import {Equipe} from '../equipes/entities/equipes.entity'

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,

    @InjectRepository(Saison)
    private readonly saisonRepo: Repository<Saison>,

    @InjectRepository(Journee)
    private readonly journeeRepo: Repository<Journee>,

    @InjectRepository(Joueur)
    private readonly joueurRepo: Repository<Joueur>,

    @InjectRepository(Equipe)
    private readonly equipeRepo: Repository<Equipe>
  ) {}


  async getSaisonCount(): Promise<{ totalSaisons: number }> {
    const totalSaisons = await this.saisonRepo.count();
    return { totalSaisons };
  }

  async getJoueurCount(): Promise<{ totalJoueurs: number }> {
    const totalJoueurs = await this.joueurRepo.count();
    return { totalJoueurs };
  }

  async getJourneeCount(): Promise<{ totalJournees: number }> {
    const totalJournees = await this.journeeRepo.count();
    return { totalJournees };
  }

  async getEquipeCount(): Promise<{ totalEquipes: number }> {
    const totalEquipes = await this.equipeRepo.count();
    return { totalEquipes };
  }
}
