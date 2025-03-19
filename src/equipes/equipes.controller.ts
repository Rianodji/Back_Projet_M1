import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { EquipesService } from './equipes.service';
import { CreateEquipeDto } from './dto/create-equipes.dto';
import { UpdateEquipeDto } from './dto/update-equipes.dto';
import { Equipe } from './entities/equipes.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('equipes')
@Controller('equipes')
export class EquipesController {
  constructor(private readonly equipesService: EquipesService) {}

  // Méthodes de lecture - Publiques
  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les équipes' })
  @ApiResponse({ status: 200, description: 'Liste des équipes récupérée avec succès.' })
  async findAll(): Promise<Equipe[]> {
    return this.equipesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une équipe par ID' })
  @ApiResponse({ status: 200, description: 'Équipe récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Équipe non trouvée.' })
  async findOne(@Param('id') id: number): Promise<Equipe> {
    return this.equipesService.findOne(id);
  }

  // Méthodes de modification - Privées, nécessite une authentification
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle équipe' })
  @ApiBody({ type: CreateEquipeDto })
  @ApiResponse({ status: 201, description: 'Équipe créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création.' })
  async create(@Body() createEquipeDto: CreateEquipeDto, @Request() req): Promise<Equipe> {
    return this.equipesService.create(createEquipeDto, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour une équipe' })
  @ApiResponse({ status: 200, description: 'Équipe mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Équipe non trouvée.' })
  async update(@Param('id') id: number, @Body() updateEquipeDto: UpdateEquipeDto, @Request() req): Promise<Equipe> {
    return this.equipesService.update(id, updateEquipeDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une équipe' })
  @ApiResponse({ status: 200, description: 'Équipe supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Équipe non trouvée.' })
  async remove(@Param('id') id: number, @Request() req): Promise<{ message: string }> {
    await this.equipesService.remove(id, req.user);
    return { message: 'Équipe supprimée avec succès.' };
  }
}
