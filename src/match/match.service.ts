// MatchService sécurisé avec CASL via la journée + gestion try/catch comme JoueurService
import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Journee } from '../journee/entities/journee.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { UserInterface } from '../casl/interfaces/user.interface';
import { Action } from '../casl/enums/action.enum';
import { LeagueInterface } from '../casl/interfaces/league.interface';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,

    @InjectRepository(Journee)
    private journeeRepository: Repository<Journee>,

    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async create(createMatchDto: CreateMatchDto, currentUser: any): Promise<Partial<Match>> {
    if (!currentUser.userId) {
      throw new UnauthorizedException("Utilisateur non valide");
    }

    const journee = await this.journeeRepository.findOne({
      where: { id: createMatchDto.journeeId },
      relations: ['saison', 'saison.league', 'saison.league.user']
    });

    if (!journee) throw new NotFoundException('Journée non trouvée');

    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);

    const leagueData = new LeagueInterface();
    leagueData.id = journee.saison.league.id;
    leagueData.userId = journee.saison.league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException('Vous n\'êtes pas autorisé à créer un match dans cette ligue');
    }

    const match = this.matchRepository.create({ ...createMatchDto, journee });
    let matchSaved;
    try {
      matchSaved = await this.matchRepository.save(match);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la création du match");
    }

    const { journee: _, ...result } = matchSaved;
    return result;
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find({ relations: ['journee', 'matchEquipes', 'matchArbitres', 'selections'] });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['journee', 'matchEquipes', 'matchArbitres', 'selections']
    });
    if (!match) throw new NotFoundException('Match non trouvé');
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto, currentUser: any): Promise<Partial<Match>> {
    const match = await this.matchRepository.findOne({ where: { id }, relations: ['journee', 'journee.saison', 'journee.saison.league', 'journee.saison.league.user'] });
    if (!match) throw new NotFoundException('Match non trouvé');

    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);
    const leagueData = new LeagueInterface();
    leagueData.id = match.journee.saison.league.id;
    leagueData.userId = match.journee.saison.league.user.id;

    if (!ability.can(Action.Update, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier ce match");
    }

    Object.assign(match, updateMatchDto);
    let matchUpdated;
    try {
      matchUpdated = await this.matchRepository.save(match);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la mise à jour du match");
    }
    const { journee: _, ...result } = matchUpdated;
    return result;
  }

  async remove(id: number, currentUser: any): Promise<void> {
    const match = await this.matchRepository.findOne({ where: { id }, relations: ['journee', 'journee.saison', 'journee.saison.league', 'journee.saison.league.user'] });
    if (!match) throw new NotFoundException('Match non trouvé');

    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;

    const ability = this.caslAbilityFactory.createForUser(userCur);
    const leagueData = new LeagueInterface();
    leagueData.id = match.journee.saison.league.id;
    leagueData.userId = match.journee.saison.league.user.id;

    if (!ability.can(Action.Delete, leagueData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer ce match");
    }

    try {
      await this.matchRepository.remove(match);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la suppression du match");
    }
  }
}
