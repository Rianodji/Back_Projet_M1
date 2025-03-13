import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { CreateSaisonDto } from './dto/create-saison.dto';
import { User } from 'users/entities/user.entity';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from 'casl/casl-ability.factory/casl-ability.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'casl/interfaces/user.interface';
import { LeagueInterface } from 'casl/interfaces/league.interface';
import { Action } from 'casl/enums/action.enum';
import { Saison } from './entities/saison.entity';
import { League } from 'league/entities/league.entity';


@Injectable()
export class SaisonService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Saison)
        private saisonRepository: Repository<Saison>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        private caslAbilityFactory: CaslAbilityFactory
      ) {}
    
      async create(createSaisonDto: CreateSaisonDto, currentUser: any): Promise<Partial<Saison>> {
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
            throw new ForbiddenException("Vous n'êtes pas autorisé à créer une Saison.");
        }
    
        const leagueId = createSaisonDto.league; // L'ID de la ligue
    
        // Récupération de la ligue avec la relation 'user'
        const league = await this.leagueRepository.findOne({
            where: { id: leagueId }, // Correction : Ajout du filtre pour récupérer la ligue correcte
            relations: ['user']
        });
    
        // Vérifier si la ligue existe
        if (!league) {
            throw new NotFoundException('Ligue non trouvée');
        }
    
        const saison = new Saison();
        saison.debut = createSaisonDto.debut;
        saison.fin = createSaisonDto.fin;
        saison.nb_arbitre = createSaisonDto.nb_arbitre;
        saison.nb_equipe = createSaisonDto.nb_equipe;
        saison.nb_remplacement = createSaisonDto.nb_remplacement;
        saison.league = league;
    
        const saisonSaved = await this.saisonRepository.save(saison);
    
        const { league: _, ...result } = saisonSaved;
    
        return result;
    }
}