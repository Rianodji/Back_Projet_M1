import { Controller, Get, Post, Patch, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update_user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@ApiTags('users')  // Tag pour grouper les routes liées aux utilisateurs
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Méthode pour créer un utilisateur
  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })  // Description de l'opération
  @ApiBody({ type: CreateUserDto })  // Spécification du DTO pour le body de la requête
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })  // Réponse si tout va bien
  @ApiResponse({ status: 400, description: 'Erreur lors de la création.' })  // Réponse en cas d'erreur
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.usersService.create(createUserDto);
  }

  // Méthode pour récupérer un utilisateur par ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtenir un utilisateur par ID' })  // Description de l'opération
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré avec succès.' })  // Réponse si tout va bien
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })  // Réponse si l'utilisateur n'est pas trouvé
  async findOne(@Param('id') id: number): Promise<Partial<User>> {
    return this.usersService.findOneById(id);
  }

  // Méthode pour mettre à jour un utilisateur par ID
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })  // Description de l'opération
  @ApiBody({ type: UpdateUserDto })  // Spécification du DTO pour le body de la requête
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès.' })  // Réponse si tout va bien
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })  // Réponse si l'utilisateur n'existe pas
  @ApiResponse({ status: 204, description: 'Aucune modification effectuée.' })  // Réponse si aucune modification
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User> | void> {
    const result = await this.usersService.update(id, updateUserDto);
    
    if (!result) {
      throw new HttpException('Aucune modification effectuée.', HttpStatus.NO_CONTENT);
    }
  }
}