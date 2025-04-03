import { Injectable, NotFoundException, ForbiddenException, UnauthorizedException ,InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateSaisonDto } from './dto/create-saison.dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../casl/interfaces/user.interface';
import { LeagueInterface } from '../casl/interfaces/league.interface';
import { Action } from '../casl/enums/action.enum';
import { Saison } from './entities/saison.entity';
import { League } from '../league/entities/league.entity';
import { UpdateSaisonDto } from './dto/update-saison.dto';
import { CreateArbitrageDto } from './dto/create-arbitrage.dto';
import { Arbitrage } from './entities/arbitrage.entity';
import { Arbitre } from 'arbitre/entities/arbitre.entity';
import { DeleteArbitrageDto } from './dto/delete-arbitrage.dto';


@Injectable()
export class SaisonService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Saison)
        private saisonRepository: Repository<Saison>,
        @InjectRepository(League)
        private leagueRepository: Repository<League>,
        @InjectRepository(Arbitrage)
        private arbitrageRepository: Repository<Arbitrage>,
        @InjectRepository(Arbitre)
        private arbitreRepository: Repository<Arbitre>,
        private caslAbilityFactory: CaslAbilityFactory
      ) {}
    
      async create(createSaisonDto: CreateSaisonDto, currentUser: any): Promise<Partial<Saison>> {
        // 1️⃣ Vérifier si l'utilisateur est valide
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        // 2️⃣ Vérifier que l'ID de la ligue est bien fourni dans le DTO
        if (!createSaisonDto.league) {
            throw new BadRequestException("Le champ 'league' est obligatoire.");
        }
    
        const leagueId = createSaisonDto.league; // ID de la ligue concernée
    
        // 3️⃣ Récupération de la ligue avec la relation 'user'
        const league = await this.leagueRepository.findOne({
            where: { id: leagueId },
            relations: ['user']
        });
    
        // 4️⃣ Vérifier si la ligue existe
        if (!league) {
            throw new NotFoundException("Ligue non trouvée.");
        }
    
        // 5️⃣ Vérifier que l'utilisateur a le droit de **mettre à jour** la ligue avant de créer une saison
        const leagueData = new LeagueInterface();
        leagueData.id = league.id;
        leagueData.userId = league.user.id;
    
        if (!ability.can(Action.Update, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cette ligue et donc à créer une saison.");
        }
    
        // 6️⃣ Création de la nouvelle saison
        const saison = this.saisonRepository.create({
            debut: createSaisonDto.debut,
            fin: createSaisonDto.fin,
            nb_arbitre: createSaisonDto.nb_arbitre,
            nb_equipe: createSaisonDto.nb_equipe,
            nb_remplacement: createSaisonDto.nb_remplacement,
            league: league // Association de la saison avec la ligue
        });
    
        // 7️⃣ Enregistrement en base avec gestion d'erreur
        let saisonSaved;
        try {
            saisonSaved = await this.saisonRepository.save(saison);
        } catch (error) {
            throw new InternalServerErrorException("Erreur lors de la création de la saison.");
        }
    
        // 8️⃣ Retourner les données de la saison sans la relation `league`
        const { league: _, ...result } = saisonSaved;
    
        return result;
    }
    async remove(id: number, currentUser: any): Promise<void> {
        // 1️⃣ Récupération de la saison à supprimer dans la base de données
        const saison = await this.saisonRepository.findOne({ where: { id }, relations: ['league'] });
    
        // 2️⃣ Vérification si la saison existe, sinon lancer une exception NotFound
        if (!saison) {
            throw new NotFoundException('Saison non trouvée');
        }
    
        // 3️⃣ Vérifier si l'utilisateur actuel est valide (c'est-à-dire qu'il existe et possède un userId)
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        // 4️⃣ Création d'une instance UserInterface pour gérer les permissions avec CASL
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        // 5️⃣ Création de l'ability de l'utilisateur pour effectuer des vérifications de permissions
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        // 6️⃣ Récupération de la ligue associée à la saison
        const league = saison.league;
    
        // 7️⃣ Vérifier si la ligue existe avant de poursuivre
        if (!league) {
            throw new NotFoundException('Ligue associée à cette saison non trouvée');
        }
    
        // 8️⃣ Création d'une instance de LeagueInterface pour valider les permissions d'édition de la ligue
        const leagueData = new LeagueInterface();
        leagueData.id = league.id;
        leagueData.userId = league.user.id;
    
        // 9️⃣ Vérification si l'utilisateur a les droits de supprimer la saison (basé sur la ligue associée)
        if (!ability.can(Action.Delete, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer cette saison.");
        }
    
        // 🔟 Tentative de suppression de la saison
        try {
            await this.saisonRepository.remove(saison);
        } catch (error) {
            // Gestion d'erreur lors de la suppression en base de données
            throw new InternalServerErrorException('Erreur lors de la suppression de la saison.');
        }
    }

    async update(
        id: number, 
        updateSaisonDto: UpdateSaisonDto, 
        currentUser: any
    ): Promise<Partial<Saison>> {
        // 1️⃣ Récupérer la saison à mettre à jour avec ses relations nécessaires
        const saison = await this.saisonRepository.findOne({ 
            where: { id }, 
            relations: ['league', 'league.user'] // Charger la ligue et l'utilisateur lié à la ligue
        });
    
        // 2️⃣ Vérifier si la saison existe, sinon retourner une exception
        if (!saison) {
            throw new NotFoundException('Saison non trouvée');
        }
    
        // 3️⃣ Vérifier si l'utilisateur actuel est valide (doit posséder un userId)
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        // 4️⃣ Création de l'instance UserInterface pour gérer les permissions avec CASL
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        // 5️⃣ Création de l'ability de l'utilisateur pour vérifier ses permissions d'action
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        const league = saison.league;
    
        // 6️⃣ Vérification si la ligue et son utilisateur existent
        if (!league || !league.user) {
            throw new NotFoundException('Ligue associée introuvable');
        }
    
        // 7️⃣ Création d'une instance de LeagueInterface pour valider les permissions d'action sur la ligue
        const leagueData = new LeagueInterface();
        leagueData.id = league.id;
        leagueData.userId = league.user.id;
    
        // 8️⃣ Vérifier si l'utilisateur a les droits de mise à jour sur cette ligue
        if (!ability.can(Action.Update, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à mettre à jour cette saison.");
        }
    
        // 9️⃣ Mise à jour de la saison avec les données du DTO
        Object.assign(saison, updateSaisonDto);  // Fusion des propriétés de la saison existante avec celles du DTO
    
        let updatedSaison;
        try {
            // 1️⃣0️⃣ Sauvegarder la saison mise à jour dans la base de données
            updatedSaison = await this.saisonRepository.save(saison);
        } catch (error) {
            // 1️⃣1️⃣ En cas d'erreur lors de la sauvegarde, lever une exception interne
            throw new InternalServerErrorException('Erreur lors de la mise à jour de la saison');
        }
    
        // 1️⃣2️⃣ Retourner uniquement les données de la saison, sans les relations (éviter d'envoyer la ligue ici)
        const { league: _, ...result } = updatedSaison;  // Exclusion de la ligue dans le résultat
        return result;
    }

    // Méthode pour trouver une saison par son ID
    async findOne(id: number): Promise<Partial<Saison>>  {
        //Recherche de la saison par son ID dans le repository
        const saison = await this.saisonRepository.findOne({
            where: { id }, // Filtrer par l'ID de la saison
            relations:['journees','journees.matchs']
        });

        // Vérification si la saison existe, sinon lever une exception NotFoundException
        if (!saison) {
            throw new NotFoundException('Saison non trouvée');
        }

        //Retourner la saison trouvée
        return saison;
    }

    // Méthode pour récupérer toutes les saisons
    async findAll(): Promise<Partial<Saison>[]> {
        //  Récupération de toutes les saisons présentes dans le repository
        const saisons = await this.saisonRepository.find({relations:['journees','journees.matchs']});

        // Retourner la liste des saisons récupérées
        return saisons;
    }

    async addArbitreToSaison(createArbitrageDto: CreateArbitrageDto, currentUser: any): Promise<any> {
        // 1️⃣ Vérifier si l'utilisateur est valide
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        // Création d'une instance de l'utilisateur pour l'utiliser dans le CASL (vérification des permissions)
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        // Création de l'ability de l'utilisateur en utilisant le CASL
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        // 2️⃣ Vérifier que l'ID de l'arbitre est bien fourni dans le DTO
        if (!createArbitrageDto.arbitreId) {
            throw new BadRequestException("Le champ 'arbitreId' est obligatoire.");
        }
    
        const arbitreId = createArbitrageDto.arbitreId;
    
        // 3️⃣ Récupération de l'arbitre dans la base de données
        const arbitre = await this.arbitreRepository.findOne({ 
            where: { id: arbitreId },
            relations:['league']
         });

    
        // 4️⃣ Vérifier si l'arbitre existe
        if (!arbitre) {
            throw new NotFoundException("Arbitre non trouvé.");
        }

        // Vérifier si l'arbitre a une ligue associée
        if (!arbitre.league) {
            throw new BadRequestException("Cet arbitre n'est pas associé à une ligue.");
        }
    
        // 5️⃣ Vérifier que l'ID de la saison est bien fourni dans le DTO
        if (!createArbitrageDto.saisonId) {
            throw new BadRequestException("Le champ 'saisonId' est obligatoire.");
        }
    
        const saisonId = createArbitrageDto.saisonId; // ID de la saison concernée
    
        // 6️⃣ Récupération de la saison, avec la relation 'league' et 'league.user' (pour la validation des permissions)
        const saison = await this.saisonRepository.findOne({
            where: { id: saisonId },
            relations: ['league', 'league.user']
        });
    
        // 7️⃣ Vérifier si la saison existe
        if (!saison) {
            throw new NotFoundException("Saison non trouvée.");
        }

        // Comparer la ligue de l'arbitre avec celle de la saison
        if (arbitre.league.id !== saison.league.id) {
            throw new BadRequestException("L'arbitre ne peut être ajouté que dans une saison appartenant à sa ligue.");
        }
    
        const league = saison.league;
    
        // 8️⃣ Vérification si la ligue et son utilisateur existent
        if (!league || !league.user) {
            throw new NotFoundException('Ligue associée introuvable');
        }
    
        // 9️⃣ Création d'une instance de LeagueInterface pour valider les permissions d'action sur la ligue
        const leagueData = new LeagueInterface();
        leagueData.id = league.id;
        leagueData.userId = league.user.id;
    
        // 🔟 Vérifier si l'utilisateur a les droits de mise à jour sur cette ligue
        if (!ability.can(Action.Update, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à mettre à jour cette saison.");
        }
    
        // 1️⃣1️⃣ Vérifier si le nombre d'arbitres dépasse la limite définie dans la saison
        const nbArbitreMax = saison.nb_arbitre; // Le nombre maximal d'arbitres
        const nbArbitresActuels = await this.arbitrageRepository.count({ where: { saison: saison } });
    
        if (nbArbitresActuels >= nbArbitreMax) {
            throw new BadRequestException(`Le nombre maximal d'arbitres (${nbArbitreMax}) a été atteint pour cette saison.`);
        }
    
        // Vérifier si l'arbitre est déjà associé à cette saison
        const arbitreExist = await this.arbitrageRepository.count({
            where: {
            arbitre: { id: arbitre.id }, 
            saison: { id: saison.id }
            }
        });

        if (arbitreExist > 0) {
            throw new BadRequestException("Cet arbitre est déjà associé à cette saison.");
        }
    
        // 1️⃣3️⃣ Création de l'arbitrage (lien entre la saison et l'arbitre)
        const arbitrage = this.arbitrageRepository.create({
            saison: saison,
            arbitre: arbitre,
            date: new Date() // Date actuelle
        });
    
        // 1️⃣4️⃣ Enregistrement en base de l'arbitrage, gestion d'erreur en cas de problème
        let arbitrageSaved;
        try {
            arbitrageSaved = await this.arbitrageRepository.save(arbitrage);
        } catch (error) {
            throw new InternalServerErrorException("Erreur lors de la création de l'arbitrage.");
        }
    
        // 1️⃣5️⃣ Retourner uniquement les données de l'arbitrage sans la relation `saison` et `arbitre`
        const { saison: _, arbitre: __, ...result } = arbitrageSaved;
    
        return result;
    }
}