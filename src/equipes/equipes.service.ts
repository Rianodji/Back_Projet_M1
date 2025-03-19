import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipe } from './entities/equipes.entity';
import { CreateEquipeDto } from './dto/create-equipes.dto';
import { UpdateEquipeDto } from './dto/update-equipes.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EquipesService {
  constructor(
    @InjectRepository(Equipe)
    private readonly equipeRepository: Repository<Equipe>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createEquipeDto: CreateEquipeDto, currentUser: any): Promise<Equipe> {
    const user = await this.userRepository.findOne({ where: { id: currentUser.id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const equipe = new Equipe();
    equipe.nom = createEquipeDto.nom;
    equipe.ville = createEquipeDto.ville;
    equipe.dateCreation = new Date();

    const equipeSaved = await this.equipeRepository.save(equipe);
    return equipeSaved;
  }

  async findOne(id: number): Promise<Equipe> {
    const equipe = await this.equipeRepository.findOne({ where: { id } });
    if (!equipe) {
      throw new NotFoundException('Équipe non trouvée');
    }
    return equipe;
  }

  async findAll(): Promise<Equipe[]> {
    return this.equipeRepository.find();
  }

  async update(id: number, updateEquipeDto: UpdateEquipeDto, currentUser: any): Promise<Equipe> {
    const equipe = await this.equipeRepository.findOne({ where: { id } });
    if (!equipe) {
      throw new NotFoundException('Équipe non trouvée');
    }

    equipe.nom = updateEquipeDto.nom ?? equipe.nom;
    equipe.ville = updateEquipeDto.ville ?? equipe.ville;
    equipe.updatedAt = new Date();

    const updatedEquipe = await this.equipeRepository.save(equipe);
    return updatedEquipe;
  }

  async remove(id: number, currentUser: any): Promise<void> {
    const equipe = await this.equipeRepository.findOne({ where: { id } });
    if (!equipe) {
      throw new NotFoundException('Équipe non trouvée');
    }

    await this.equipeRepository.remove(equipe);
  }
}
