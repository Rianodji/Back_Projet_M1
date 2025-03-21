import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arbitre } from './entities/arbitre.entity';
import { CreateArbitreDto } from './dto/create-arbitre.dto';
import { UpdateArbitreDto } from './dto/update-arbitre.dto';
import { League } from '../league/entities/league.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { UserInterface } from '../casl/interfaces/user.interface';
import { LeagueInterface } from '../casl/interfaces/league.interface';

@Injectable()
export class ArbitreService {
  constructor(
    @InjectRepository(Arbitre)
    private readonly arbitreRepository: Repository<Arbitre>,
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create(createArbitreDto: CreateArbitreDto, currentUser: any): Promise<Partial<Arbitre>> {
    if (!currentUser.userId) {
      throw new UnauthorizedException("User non valide.");
    }
    // Vérifier si l'utilisateur a la permission de créer un arbitre
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
    
    const ability = this.caslAbilityFactory.createForUser(userCur);
    
    const leagueId = createArbitreDto.leagueId;
    if (!leagueId) {
      throw new ForbiddenException("L'ID de la ligue est requis pour créer un arbitre.");
    }
    
    const league = await this.leagueRepository.findOne({ 
      where: { id: leagueId },
      relations: ['user']
    });

    if (!league) {
      throw new NotFoundException("Ligue non trouvée.");
    }
    
    const leagueData  = new LeagueInterface();
    leagueData.id = league.id;
    leagueData.userId = league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à créer un arbitre.");
    }

    const newArbitre = this.arbitreRepository.create(
      {
        nom: createArbitreDto.nom,
        league: league,
      }
    );
    let arbitreSaved;

  try {
    arbitreSaved =  this.arbitreRepository.save(newArbitre);
  }
  catch (error) {
    throw new InternalServerErrorException('Erreur lors de la création de l\'arbitre');
  }
  
  const {league:_, ...result} = arbitreSaved;
      return result;
    }


  async findAll(): Promise<Partial<Arbitre[]> >{
  
    const arbitres = await this.arbitreRepository.find();
    return arbitres;

  }

  async findOne(id: number): Promise<Partial<Arbitre> >{
    
    const arbitre = await this.arbitreRepository.findOne( {where: { id: id },});

    if (!arbitre) {
      throw new NotFoundException("Arbitre non trouvé.");
    }

    return arbitre;
  }

  async update(id: number, updateArbitreDto: UpdateArbitreDto, currentUser: any): Promise<Partial<Arbitre>> {
    const arbitre = await this.arbitreRepository.findOne({where: { id }, relations: ['league', 'league.user']});
    if (!arbitre) {
      throw new NotFoundException("Arbitre non trouvé.");
    }

    // Vérifier les permissions de l'utilisateur avant la mise à jour
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
    
    const ability = this.caslAbilityFactory.createForUser(userCur);

    const leagueData  = new LeagueInterface();
    leagueData.id = arbitre.league.id;
    leagueData.userId = arbitre.league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cet arbitre.");
    }
    
    Object.assign(arbitre, updateArbitreDto);

    let updatedArbitre;
    try {
      updatedArbitre = await this.arbitreRepository.save(arbitre);
    }
    catch (error) {
      throw new
       InternalServerErrorException('Erreur lors de la mise à jour de l\'arbitre');
    }
    const {league:_, ...result} = updatedArbitre;
    return result;
  }

  async remove(id: number, currentUser: any): Promise<void> {
    const arbitre = await this.arbitreRepository.findOne({ 
      where: { id },
      relations: ['league', 'league.user']});  

    if (!arbitre) {
      throw new NotFoundException("Arbitre non trouvé.");
    }


     // Vérifier les permissions de l'utilisateur avant la suppression
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
    
    const ability = this.caslAbilityFactory.createForUser(userCur);

    const league = arbitre.league;

    const leagueData  = new LeagueInterface();  

    leagueData.id = league.id;
    leagueData.userId = league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer cet arbitre.");
    }

    try {
      await this.arbitreRepository.remove(arbitre);
    }
    catch (error) {
      throw new InternalServerErrorException('Erreur lors de la suppression de l\'arbitre');
    }
}
}
