import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JoueurService } from './joueur.service';
import { CreateJoueurDto } from './dto/create-joueur.dto';
import { UpdateJoueurDto } from './dto/update-joueur.dto';
import { Joueur } from './entities/joueur.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('joueurs')
@Controller('joueurs')
export class JoueurController {
  constructor(private readonly joueurService: JoueurService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau joueur' })
  @ApiBody({ type: CreateJoueurDto })
  @ApiResponse({ status: 201, description: 'Joueur créé avec succès.' })
  async create(@Body() createJoueurDto: CreateJoueurDto, @Request() req): Promise<Partial<Joueur>> {
    return this.joueurService.create(createJoueurDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les joueurs' })
  @ApiResponse({ status: 200, description: 'Liste des joueurs récupérée avec succès.' })
  async findAll(): Promise<Partial<Joueur[]>> {
    return this.joueurService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un joueur par ID' })
  @ApiResponse({ status: 200, description: 'Joueur récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Joueur non trouvé.' })
  async findOne(@Param('id') id: number): Promise<Partial<Joueur>> {
    return this.joueurService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un joueur' })
  @ApiResponse({ status: 200, description: 'Joueur mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Joueur non trouvé.' })
  async update(@Param('id') id: number, @Body() updateJoueurDto: UpdateJoueurDto, @Request() req): Promise<Partial<Joueur>> {
    return this.joueurService.update(id, updateJoueurDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un joueur' })
  @ApiResponse({ status: 200, description: 'Joueur supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Joueur non trouvé.' })
  async remove(@Param('id') id: number, @Request() req): Promise<void> {
    return this.joueurService.remove(id, req.user);
  }
}

