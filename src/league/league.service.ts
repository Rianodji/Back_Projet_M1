import { Injectable, NotFoundException, UnauthorizedException,ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { User } from '../users/entities/user.entity';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { LeagueInterface } from '../casl/interfaces/league.interface';
import { UserInterface } from '../casl/interfaces/user.interface';



@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  // Création d'une ligue et association avec l'utilisateur
  async create(createLeagueDto: CreateLeagueDto, currentUser:any ): Promise<Omit<League, "user">> {
   
  
    // Récupération de l'utilisateur à partir de l'ID passé
    const user = await this.userRepository.findOne({ where: { id: currentUser.id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);

    if (!ability.can(Action.Create, LeagueInterface)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à créer une ligue.");
    }

    const league = new League();
    league.display_name = createLeagueDto.display_name;
    league.country = createLeagueDto.country;
    league.date_creation = new Date();
    league.user = user;

    const leagueSaved = await  this.leagueRepository.save(league);

    const {user: _, ...result} = leagueSaved;
    return  result;
  }

  // Trouver une ligue par ID
  async findOne(id: number): Promise<Omit<League, "user">>  {
    const league = await this.leagueRepository.findOne({ where: { id }, relations: ['user'] });
    if (!league) {
      throw new NotFoundException('League not found');
    }

    const {user: _, ...result} = league;

    return result;
  }

  // Trouver toutes les ligues
  async findAll(): Promise<Omit<League, "user">[]> {
    const leagues = await this.leagueRepository.find();
    return leagues.map(({ user, ...rest }) => rest); 
  }

  async update(
    id: number, 
    updateLeagueDto: UpdateLeagueDto, 
    currentUser: any
  ): Promise<Omit<League, "user">> {
  
    // Vérifier si l'utilisateur actuel est valide
    if (!currentUser || !currentUser.userId) {
      throw new UnauthorizedException('Utilisateur non valide');
    }
  
    // Création d'une instance UserInterface pour gérer les permissions avec CASL
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
  
    // Génération des permissions basées sur l'utilisateur actuel
    const ability = this.caslAbilityFactory.createForUser(userCur);
  
    // Récupération de la ligue avec la relation 'user'
    let league;
    try {
      league = await this.leagueRepository.findOne({ where: { id }, relations: ['user'] });
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la récupération de la ligue');
    }
  
    // Vérifier si la ligue existe
    if (!league) {
      throw new NotFoundException('Ligue non trouvée');
    }
  
    // Vérifier si la relation 'user' est présente
    if (!league.user) {
      throw new NotFoundException('Aucun utilisateur associé à cette ligue');
    }
  
    // Création d'une instance de LeagueInterface pour la validation CASL
    const leagueData = new LeagueInterface();
    leagueData.id = league.id;
    leagueData.userId = league.user.id;
  
    // Vérification des permissions pour la mise à jour
    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cette ligue.");
    }
  
    // Mise à jour des données de la ligue avec les nouvelles valeurs
    Object.assign(league, updateLeagueDto);
  
    // Sauvegarde des modifications en base de données
    let updatedLeague;
    try {
      updatedLeague = await this.leagueRepository.save(league);
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la mise à jour de la ligue');
    }
  
    // Exclusion de la relation 'user' avant de retourner l'objet mis à jour
    const { user, ...result } = updatedLeague;
  
    return result;
  }
  async remove(id: number, currentUser: any): Promise<void> {
    // Création d'une instance UserInterface pour gérer les permissions avec CASL
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);
  
    const league = await this.leagueRepository.findOne({ where: { id }, relations: ['user'] });
  
    if (!league) {
      throw new NotFoundException('Ligue non trouvée');
    }

    // Vérifier si la relation 'user' est présente
    if (!league.user) {
      throw new NotFoundException('Aucun utilisateur associé à cette ligue');
    }

    // Création d'une instance de LeagueInterface pour la validation CASL
    const leagueData = new LeagueInterface();
    leagueData.id = league.id;
    leagueData.userId = league.user.id;
  
    if (!ability.can(Action.Delete, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer cette ligue.");
    }
  
    await this.leagueRepository.remove(league);
  }
}