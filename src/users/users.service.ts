import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';  // On va créer ce DTO pour valider les données

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,  // Injection du repository User
  ) {}

  // Méthode pour créer un utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);  // Créer l'utilisateur avec le DTO
    return this.usersRepository.save(user);  // Sauvegarder dans la base de données
  }

  // Méthode pour récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();  // Récupérer tous les utilisateurs
  }

  // Méthode pour récupérer un utilisateur par ID
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },  // Recherche l'utilisateur par id
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}