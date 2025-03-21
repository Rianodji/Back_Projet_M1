import { Injectable, NotFoundException, UnauthorizedException,ForbiddenException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journee } from './entities/journee.entity';
import { UpdateJourneeDto } from './dto/update-journee.dto';
import { UserInterface } from '../casl/interfaces/user.interface';
import { LeagueInterface } from '../casl/interfaces/league.interface';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { Saison } from '../saison/entities/saison.entity';
import { CreateJourneeDto } from './dto/create-journee.dto';


@Injectable()
export class JourneeService {
    constructor(
        @InjectRepository(Journee)
        private  journeeRepository: Repository<Journee>,
        @InjectRepository(Saison)
        private saisonRepository: Repository<Saison>,
        private caslAbilityFactory: CaslAbilityFactory
    )
    {}

    async create(createJourneeDto: CreateJourneeDto, currentUser: any): Promise<Partial<Journee>> {
        // 1️⃣ Vérifier si l'utilisateur est valide
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        // 2️⃣ Vérifier que `saisonId` est présent dans le DTO
        if (!createJourneeDto.saisonId) {
            throw new BadRequestException('Le champ saisonId est obligatoire.');
        }
    
        // 3️⃣ Récupérer la saison associée
        const saison = await this.saisonRepository.findOne({
            where: { id: createJourneeDto.saisonId },
            relations: ['league', 'league.user']
        });
    
        if (!saison) {
            throw new NotFoundException('Saison introuvable.');
        }
    
        // 4️⃣ Vérifier que la ligue et son utilisateur existent
        if (!saison.league || !saison.league.user) {
            throw new NotFoundException('Ligue associée introuvable.');
        }
    
        // 5️⃣ Vérifier si l'utilisateur peut mettre à jour la ligue
        const leagueData = new LeagueInterface();
        leagueData.id = saison.league.id;
        leagueData.userId = saison.league.user.id;
    
        if (!ability.can(Action.Update, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à ajouter une journée à cette saison.");
        }
    
        // 6️⃣ Créer une nouvelle journée
        const newJournee = this.journeeRepository.create({
            numero: createJourneeDto.numero,
            debut: createJourneeDto.debut,
            fin: createJourneeDto.fin,
            saison: saison // Liaison avec la saison
        });
    
        // 7️⃣ Enregistrement en base de données
        try {
            await this.journeeRepository.save(newJournee);
        } catch (error) {
            throw new InternalServerErrorException('Erreur lors de la création de la journée.');
        }
    
        // 8️⃣ Renvoyer uniquement les attributs nécessaires sans relations complètes
        const { saison: _, ...result } = newJournee; // Omettre la relation 'saison'
        return result; // Vous renvoyez uniquement les attributs de la journée, sans la saison
    }
    async remove(id: number, currentUser: any): Promise<void> {
        // 1️⃣ Vérifier si l'utilisateur est valide
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        // 2️⃣ Rechercher la journée avec ses relations
        const day = await this.journeeRepository.findOne({ 
            where: { id },
            relations: ['saison', 'saison.league', 'saison.league.user']
        });
    
        if (!day) {
            throw new NotFoundException('Journée introuvable');
        }
    
        // 3️⃣ Vérifier que la saison et la ligue existent
        if (!day.saison || !day.saison.league || !day.saison.league.user) {
            throw new NotFoundException('Ligue ou saison associée introuvable');
        }
    
        // 4️⃣ Initialiser l'utilisateur et vérifier les permissions CASL
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        const league = day.saison.league;
        const leagueData = new LeagueInterface();
        leagueData.id = league.id;
        leagueData.userId = league.user.id;
    
        if (!ability.can(Action.Delete, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer cette Journée.");
        }
    
        // 5️⃣ Suppression sécurisée avec gestion des erreurs
        try {
            await this.journeeRepository.remove(day);
        } catch (error) {
            throw new InternalServerErrorException('Erreur lors de la suppression de la journée');
        }
    }

    async update(
        id: number, 
        updateJourneeDto: UpdateJourneeDto, 
        currentUser: any
    ): Promise<Partial<Journee>> {
        // 1️⃣ Vérifier si un `saisonId` est fourni et s'assurer qu'il existe
        let saison ;
        if (updateJourneeDto.saisonId) {
            saison = await this.saisonRepository.findOne({ where: { id: updateJourneeDto.saisonId } });
            if (!saison) {
                throw new NotFoundException('Saison spécifiée introuvable');
            }
        }
    
        // 2️⃣ Vérifier si la journée existe pour cette saison
        const day = await this.journeeRepository.findOne({ 
            where: { id, ...(saison ? { saison: { id: saison.id } } : {}) }, 
            relations: ['saison', 'saison.league', 'saison.league.user'] 
        });
    
        if (!day) {
            throw new NotFoundException('Journée introuvable pour cette saison');
        }
    
        // 3️⃣ Vérifier si l'utilisateur actuel est valide
        if (!currentUser || !currentUser.userId) {
            throw new UnauthorizedException('Utilisateur non valide');
        }
    
        // 4️⃣ Création d'une instance UserInterface pour gérer les permissions avec CASL
        const userCur = new UserInterface();
        userCur.id = currentUser.userId;
        userCur.roles = currentUser.roles;
    
        const ability = this.caslAbilityFactory.createForUser(userCur);
    
        const league = day.saison.league;
    
        // 5️⃣ Vérifier que la ligue et son utilisateur existent
        if (!league || !league.user) {
            throw new NotFoundException('Ligue associée introuvable');
        }
    
        // 6️⃣ Création d'une instance de LeagueInterface pour la validation CASL
        const leagueData = new LeagueInterface();
        leagueData.id = league.id;
        leagueData.userId = league.user.id;
    
        if (!ability.can(Action.Update, leagueData)) {
            throw new ForbiddenException("Vous n'êtes pas autorisé à mettre à jour cette journée.");
        }
    
        // 7️⃣ Appliquer la mise à jour
        Object.assign(day, updateJourneeDto);
    
        let updatedDay;
        try {
            updatedDay = await this.journeeRepository.save(day);
        } catch (error) {
            throw new InternalServerErrorException('Erreur lors de la mise à jour de la journée');
        }
    
        // 8️⃣ Retourner uniquement les attributs de Journee, sans les relations
        const { saison: _, ...result } = updatedDay;
        return result;
    }

    //Méthode pour trouver une journée par son ID
    async findOne(id: number): Promise<Partial<Journee>> {
        //Recherche de la journée par son ID dans le repository
        const day = await this.journeeRepository.findOne({ 
            where: { id } // Filtrer par l'ID de la journée
        });

        //Vérification si la journée existe, sinon lever une exception NotFoundException
        if (!day) {
            throw new NotFoundException('Journee non trouvée');
        }

        //Retourner la journée trouvée
        return day;
    }

    //Méthode pour récupérer toutes les journées
    async findAll(): Promise<Partial<Journee>[]> {
        //Récupération de toutes les journées présentes dans le repository
        const journees = await this.journeeRepository.find();

        //Retourner la liste des journées récupérées
        return journees;
    }          
}
