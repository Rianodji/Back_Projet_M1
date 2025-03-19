import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ArbitreService } from './arbitre.service';
import { CreateArbitreDto } from './dto/create-arbitre.dto';
import { UpdateArbitreDto } from './dto/update-arbitre.dto';
import { Arbitre } from './entities/arbitre.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('arbitres')
@Controller('arbitres')
export class ArbitreController {
  constructor(private readonly arbitreService: ArbitreService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouvel arbitre' })
  @ApiBody({ type: CreateArbitreDto })
  @ApiResponse({ status: 201, description: 'Arbitre créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création.' })
  async create(@Body() createArbitreDto: CreateArbitreDto): Promise<Arbitre> {
    return this.arbitreService.create(createArbitreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les arbitres' })
  @ApiResponse({ status: 200, description: 'Liste des arbitres récupérée avec succès.' })
  async findAll(): Promise<Arbitre[]> {
    return this.arbitreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un arbitre par ID' })
  @ApiResponse({ status: 200, description: 'Arbitre récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })
  async findOne(@Param('id') id: number): Promise<Arbitre> {
    return this.arbitreService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un arbitre' })
  @ApiResponse({ status: 200, description: 'Arbitre mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })
  async update(@Param('id') id: number, @Body() updateArbitreDto: UpdateArbitreDto): Promise<Arbitre> {
    return this.arbitreService.update(id, updateArbitreDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un arbitre' })
  @ApiResponse({ status: 200, description: 'Arbitre supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Arbitre non trouvé.' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.arbitreService.remove(id);
    return { message: 'Arbitre supprimé avec succès.' };
  }
}
