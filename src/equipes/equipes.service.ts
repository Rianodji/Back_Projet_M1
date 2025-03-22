import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipe } from './entities/equipes.entity';
import { CreateEquipeDto } from './dto/create-equipes.dto';
import { UpdateEquipeDto } from './dto/update-equipes.dto';
import { League } from '../league/entities/league.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { UserInterface } from '../casl/interfaces/user.interface';
import { LeagueInterface } from '../casl/interfaces/league.interface';

@Injectable()
export class EquipesService {
  constructor(
    @InjectRepository(Equipe)
    private readonly equipeRepository: Repository<Equipe>,
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create(createEquipeDto: CreateEquipeDto, currentUser: any): Promise<Equipe> {
    if (!currentUser?.userId) {
      throw new UnauthorizedException("Utilisateur non valide.");
    }
  
    // Vérifier si l'utilisateur a déjà créé une ligue
    const userLeague = await this.leagueRepository.findOne({
      where: { user: { id: currentUser.userId } },
      relations: ['user'], // Inclure les relations pour vérifier l'utilisateur
    });
  
    if (!userLeague) {
      throw new ForbiddenException("Vous devez d'abord créer une ligue avant de pouvoir créer une équipe.");
    }
  
    // Vérification des permissions de l'utilisateur
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
  
    const ability = this.caslAbilityFactory.createForUser(userCur);
  
    const leagueData = new LeagueInterface();
    leagueData.id = userLeague.id;
    leagueData.userId = userLeague.user.id;
  
    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à créer une équipe.");
    }
  
    // Création de l'équipe
    const newEquipe = this.equipeRepository.create({
      nom: createEquipeDto.nom,
      ville: createEquipeDto.ville,
      league: userLeague,
      dateCreation: new Date(),
    });
    
    let equipeSaved;
    try {
       equipeSaved = await this.equipeRepository.save(newEquipe);
      
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la création de l'équipe.");
    }
    const { league: _, ...result } = equipeSaved; 
      return result;
  }

  async findOne(id: number): Promise<Equipe> {
    const equipe = await this.equipeRepository.findOne({ where: {id: id } });
    if (!equipe) {
      throw new NotFoundException("Équipe non trouvée.");
    }
    return equipe;
  }

  async findAll(): Promise<Equipe[]> {

    const equipes = await this.equipeRepository.find();
    return equipes;
  }

  async update(id: number, updateEquipeDto: UpdateEquipeDto, currentUser: any): Promise<Partial<Equipe>> {
    const equipe = await this.equipeRepository.findOne({ where: { id }, relations: ['league', 'league.user'] });
    if (!equipe) {
      throw new NotFoundException("Équipe non trouvée.");
    }

    // Vérification des permissions
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);

    const leagueData = new LeagueInterface();
    leagueData.id = equipe.league.id;
    leagueData.userId = equipe.league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cette équipe.");
    }

    Object.assign(equipe, updateEquipeDto);
    equipe.updatedAt = new Date();

    let updatedEquipe;
    try {
      updatedEquipe = await this.equipeRepository.save(equipe);
      const { league: _, ...result } = updatedEquipe; // Supprime la référence à la ligue pour éviter une fuite d'information
      return result;
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la mise à jour de l'équipe.");
    }
  }

  async remove(id: number, currentUser: any): Promise<void> {
    const equipe = await this.equipeRepository.findOne({ where: { id }, relations: ['league', 'league.user'] });
    if (!equipe) {
      throw new NotFoundException("Équipe non trouvée.");
    }

    // Vérification des permissions
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);

    const leagueData = new LeagueInterface();
    leagueData.id = equipe.league.id;
    leagueData.userId = equipe.league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer cette équipe.");
    }

    try {
      await this.equipeRepository.remove(equipe);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la suppression de l'équipe.");
    }
  }
}
