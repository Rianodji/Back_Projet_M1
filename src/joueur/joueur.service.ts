import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joueur } from './entities/joueur.entity';
import { CreateJoueurDto } from './dto/create-joueur.dto';
import { UpdateJoueurDto } from './dto/update-joueur.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/action.enum';
import { JoueurInterface } from '../casl/interfaces/joueur.interface';
import { UserInterface } from '../casl/interfaces/user.interface';

@Injectable()
export class JoueurService {
  constructor(
    @InjectRepository(Joueur)
    private readonly joueurRepository: Repository<Joueur>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  // Création d'un joueur
  async create(createJoueurDto: CreateJoueurDto, currentUser: any): Promise<Joueur> {
    // Vérification ou gestion des permissions peut être ajoutée ici si nécessaire.
    const joueur = this.joueurRepository.create(createJoueurDto);
    try {
      return await this.joueurRepository.save(joueur);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la création du joueur");
    }
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
  async update(id: number, updateJoueurDto: UpdateJoueurDto, currentUser: any): Promise<Joueur> {
    const joueur = await this.joueurRepository.findOne({ where: { id } });
    if (!joueur) {
      throw new NotFoundException("Joueur non trouvé");
    }

    // Vérification des permissions avec CASL
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
    const ability = this.caslAbilityFactory.createForUser(userCur);
    const joueurData = new JoueurInterface();
    joueurData.id = joueur.id;
    // D'autres propriétés pouvant être utilisées pour la vérification des droits

    if (!ability.can(Action.Update, joueurData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier ce joueur");
    }

    Object.assign(joueur, updateJoueurDto);
    try {
      return await this.joueurRepository.save(joueur);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la mise à jour du joueur");
    }
  }

  // Suppression d'un joueur
  async remove(id: number, currentUser: any): Promise<void> {
    const joueur = await this.joueurRepository.findOne({ where: { id } });
    if (!joueur) {
      throw new NotFoundException("Joueur non trouvé");
    }

    // Vérification des permissions avec CASL
    const userCur = new UserInterface();
    userCur.id = currentUser.userId;
    userCur.roles = currentUser.roles;
    const ability = this.caslAbilityFactory.createForUser(userCur);
    const joueurData = new JoueurInterface();
    joueurData.id = joueur.id;

    if (!ability.can(Action.Delete, joueurData)) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer ce joueur");
    }

    await this.joueurRepository.remove(joueur);
  }
}

