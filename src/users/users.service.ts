// users.service.ts
import { Injectable, NotFoundException, BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import * as bcrypt from 'bcryptjs';
import { SanitizerService } from '../sanitizer/sanitizer.service';
import { Role } from '../role/entities/role.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    private readonly htmlSanitizerService: SanitizerService,
  
  ) {}

  // Méthode pour trouver un utilisateur par son ID
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id }); // Recherche de l'utilisateur avec un objet de critères (ici l'id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // Si l'utilisateur n'est pas trouvé, une exception est lancée
    }
    return user; // Si l'utilisateur est trouvé, il est renvoyé
  }

  // Méthode pour trouver un utilisateur par son ID
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email }); // Recherche de l'utilisateur avec un objet de critères (ici l'id)
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`); // Si l'utilisateur n'est pas trouvé, une exception est lancée
    }
    return user; // Si l'utilisateur est trouvé, il est renvoyé
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    createUserDto.first_name = this.htmlSanitizerService.sanitize(createUserDto.first_name);
    createUserDto.last_name = this.htmlSanitizerService.sanitize(createUserDto.last_name);
  
    // Vérification de l'email
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('Cet email est déjà utilisé');
    }
  
    // Générer un salt
    const salt = await bcrypt.genSalt(10);
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
  
    // Récupérer le rôle "user" par défaut
    const defaultRole = await this.rolesRepository.findOne({ where: { name: 'user' } });
  
    if (!defaultRole) {
      throw new InternalServerErrorException('Service indisponible');
    }
  
    // Création de l'utilisateur avec le rôle
    const user = this.usersRepository.create({ ...createUserDto, roles: [defaultRole] });
    const savedUser = await this.usersRepository.save(user);
  
    return savedUser.toResponseObject();
  }
  async findOneByEmail(email: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login: user.last_login,
    };
  }
  
  async findOneById(id: number): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login: user.last_login,
    };
  }
  
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersRepository.find({ relations: ['roles'] });
  
    return users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login: user.last_login,
    }));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Partial<User> | null>{
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);

    // Vérification des changements
    const { first_name, last_name } = updateUserDto;
    let hasChanges = false;

    if (first_name !== undefined && first_name !== user.first_name) {
        user.first_name = this.htmlSanitizerService.sanitize(first_name);
        hasChanges = true;
    }

    if (last_name !== undefined && last_name !== user.last_name)
    {
      user.last_name = this.htmlSanitizerService.sanitize(last_name);
      hasChanges = true;
    }

    // Si aucun changement, on retourne un objet avec le statut 204
    if (!hasChanges) {
      return null;
    }



    // Mise à jour uniquement si nécessaire
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id });

    if (!updatedUser) throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé après mise à jour`);
    return updatedUser.toResponseObject();
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.usersRepository.update(userId, { last_login: new Date() });
  }



  async getUserRolesByEmail(email: string): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  
    return user.roles.map(role => role.name); // Retourne uniquement un tableau des noms des rôles
  }
  
  async getUserRolesById(id: number): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return user.roles.map(role => role.name); // Retourne uniquement un tableau des noms des rôles
  }
}