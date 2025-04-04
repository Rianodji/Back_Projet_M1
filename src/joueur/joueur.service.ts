import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joueur } from './entities/joueur.entity';
import { CreateJoueurDto } from './dto/create-joueur.dto';
import { UpdateJoueurDto } from './dto/update-joueur.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { UserInterface } from '../casl/interfaces/user.interface';
import { League } from '../league/entities/league.entity';
import { LeagueInterface } from '../casl/interfaces/league.interface';


@Injectable()
export class JoueurService {
  constructor(
    @InjectRepository(Joueur)
    private readonly joueurRepository: Repository<Joueur>,

    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,

    private caslAbilityFactory: CaslAbilityFactory,
  ) {}
    
  // Création d'un joueur avec sécurisation par rapport à la ligue
  async create(createJoueurDto: CreateJoueurDto, currentUser: any): Promise<Partial<Joueur>> {
    if (!currentUser.userId) {
      throw new UnauthorizedException("Utilisateur non valide");
    }

    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);

    const league = await this.leagueRepository.findOne({
      where: { id: createJoueurDto.leagueId },
      relations: ['user']
    });

    if (!league) {
      throw new NotFoundException("Ligue non trouvée");
    }

    const leagueData = new LeagueInterface();
    leagueData.id = league.id;
    leagueData.userId = league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à créer un joueur dans cette ligue");
    }

    const joueur = this.joueurRepository.create({
      nom: createJoueurDto.nom,
      prenom: createJoueurDto.prenom,
      date_naissance: createJoueurDto.date_naissance,
      post: createJoueurDto.post,
      league,
    });

    let joueurSaved;
    try {
      joueurSaved = await this.joueurRepository.save(joueur);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la création du joueur");
    }

    const { league: _, ...result } = joueurSaved;
    return result;
  }

  // Récupérer tous les joueurs
  async findAll(): Promise<Joueur[]> {
    return await this.joueurRepository.find();
  }

  // Récupérer un joueur par ID
  async findOne(id: number): Promise<Joueur> {
    const joueur = await this.joueurRepository.findOne({ where: { id } });
    if (!joueur) {
      throw new NotFoundException("Joueur non trouvé");
    }
    return joueur;
  }

  // Mise à jour d'un joueur
  async update(id: number, updateJoueurDto: UpdateJoueurDto, currentUser: any): Promise<Partial<Joueur>> {
    const joueur = await this.joueurRepository.findOne({ where: { id }, relations: ['league', 'league.user'] });
    if (!joueur) {
      throw new NotFoundException("Joueur non trouvé");
    }

    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);
    const leagueData = new LeagueInterface();
    leagueData.id = joueur.league.id;
    leagueData.userId = joueur.league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier ce joueur");
    }

    Object.assign(joueur, updateJoueurDto);
    let joueurUpdated;
    try {
      joueurUpdated = await this.joueurRepository.save(joueur);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la mise à jour du joueur");
    }
    const { league: _, ...result } = joueurUpdated;
    return result;
  }

  // Suppression d'un joueur
  async remove(id: number, currentUser: any): Promise<void> {
    // Récupération du joueur avec sa ligue et l'utilisateur propriétaire de la ligue
    const joueur = await this.joueurRepository.findOne({ 
      where: { id },
      relations: ['league', 'league.user']
    });
  
    if (!joueur) {
      throw new NotFoundException("Joueur non trouvé.");
    }
  
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
  
    const ability = this.caslAbilityFactory.createForUser(userCur);
  
    const leagueData = new LeagueInterface(); 
    leagueData.id = joueur.league.id;
    leagueData.userId = joueur.league.user.id;

  
    // Vérification de permission
    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer ce joueur.");
    }
  
    // Suppression protégée
    try {
      await this.joueurRepository.remove(joueur);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la suppression du joueur");
    }
  }
  
}

