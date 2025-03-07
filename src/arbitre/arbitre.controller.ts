import { Controller, Get, Post, Patch, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ArbitreService } from './arbitre.service';
import { CreateArbitreDto } from './dto/create-arbitre.dto';
import { Arbitre } from './entities/arbitre.entity';
import { UpdateArbitreDto } from './dto/update-arbitre.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('arbitre')  // Tag pour grouper les routes liées aux arbitres
@Controller('arbitre')
export class ArbitreController {
  constructor(private readonly arbitresService: ArbitreService) {}

  // Méthode pour créer un arbitre
  @Post()
  @ApiOperation({ summary: 'Créer un nouvel arbitre' })  // Description de l'opération
  @ApiBody({ type: CreateArbitreDto })  // Spécification du DTO pour le body de la requête
  @ApiResponse({ status: 201, description: 'Arbitre créé avec succès.' })  // Réponse si tout va bien
  @ApiResponse({ status: 400, description: 'Erreur lors de la création.' })  // Réponse en cas d'erreur
  async create(@Body() createArbitreDto: CreateArbitreDto): Promise<Partial<Arbitre>> {
    return this.arbitresService.create(createArbitreDto);
  }

  // Méthode pour récupérer un arbitre par ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Indique que l'authentification est requise
  @ApiOperation({ summary: 'Obtenir un arbitre par ID' })  // Description de l'opération
  @ApiResponse({ status: 200, description: 'Arbitre récupéré avec succès.' })  // Réponse si tout va bien
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })  // Réponse si l'arbitre n'est pas trouvé
  async findOne(@Param('id') id: number): Promise<Partial<Arbitre>> {
    return this.arbitresService.findOneById(id);
  }

  // Méthode pour mettre à jour un arbitre par ID
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un arbitre' })  // Description de l'opération
  @ApiBody({ type: UpdateArbitreDto })  // Spécification du DTO pour le body de la requête
  @ApiResponse({ status: 200, description: 'Arbitre mis à jour avec succès.' })  // Réponse si tout va bien
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })  // Réponse si l'arbitre n'existe pas
  @ApiResponse({ status: 204, description: 'Aucune modification effectuée.' })  // Réponse si aucune modification
  async update(@Param('id') id: number, @Body() updateArbitreDto: UpdateArbitreDto): Promise<Partial<Arbitre> | void> {
    const result = await this.arbitresService.update(id, updateArbitreDto);
    
    if (!result) {
      throw new HttpException('Aucune modification effectuée.', HttpStatus.NO_CONTENT);
    }
  }
}
