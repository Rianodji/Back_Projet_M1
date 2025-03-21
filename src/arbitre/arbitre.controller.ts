import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArbitreService } from './arbitre.service';
import { CreateArbitreDto } from './dto/create-arbitre.dto';
import { UpdateArbitreDto } from './dto/update-arbitre.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Arbitre } from './entities/arbitre.entity';

@ApiTags('arbitres')
@Controller('arbitres')
export class ArbitreController {
  constructor(private readonly arbitreService: ArbitreService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouvel arbitre' })
  @ApiResponse({ status: 201, description: 'Arbitre créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création de l\'arbitre.' })
  async create(@Body() createArbitreDto: CreateArbitreDto, @Request() req) : Promise<Partial<Arbitre>> {    
    return  this.arbitreService.create(createArbitreDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les arbitres de la ligue de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des arbitres récupérée avec succès.' })
  async findAll(@Request() req): Promise<Partial<Arbitre[]> >{    
    return this.arbitreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un arbitre par ID' })
  @ApiResponse({ status: 200, description: 'Arbitre récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })
  async findOne(@Param('id') id: string): Promise<Partial<Arbitre>> {
    return this.arbitreService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un arbitre' })
  @ApiResponse({ status: 200, description: 'Arbitre mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })
  @ApiResponse({ status: 403, description: 'Non autorisé à modifier cet arbitre.' })
  async update(@Param('id') id: number, @Body() updateArbitreDto: UpdateArbitreDto, @Request() req) : Promise<Partial<Arbitre>> {
    return this.arbitreService.update(id, updateArbitreDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un arbitre' })
  @ApiResponse({ status: 200, description: 'Arbitre supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })
  @ApiResponse({ status: 403, description: 'Non autorisé à supprimer cet arbitre.' })
  async remove(@Param('id') id: number, @Request() req) : Promise<void> {
   return this.arbitreService.remove(id, req.user);
  
}
}