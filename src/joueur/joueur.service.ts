import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joueur } from './joueur.entity';
import { CreateJoueurDto } from './dto/create-joueur.dto';

@Injectable()
export class JoueurService {
  constructor(
    @InjectRepository(Joueur)
    private joueurRepository: Repository<Joueur>,
  ) {}

  // Créer un joueur
  async create(createJoueurDto: CreateJoueurDto): Promise<Joueur> {
    const joueur = this.joueurRepository.create(createJoueurDto);
    return await this.joueurRepository.save(joueur);
  }

  // Trouver un joueur par son ID
  async findOne(id: number): Promise<Joueur> {
    return await this.joueurRepository.findOne(id);
  }

  // Récupérer tous les joueurs
  async findAll(): Promise<Joueur[]> {
    return await this.joueurRepository.find();
  }

  // Mettre à jour un joueur
  async update(id: number, updateJoueurDto: CreateJoueurDto): Promise<Joueur> {
    await this.joueurRepository.update(id, updateJoueurDto);
    return this.joueurRepository.findOne(id);
  }

  // Supprimer un joueur
  async remove(id: number): Promise<void> {
    await this.joueurRepository.delete(id);
  }
}

