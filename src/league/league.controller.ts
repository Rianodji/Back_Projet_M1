import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { League } from './entities/league.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateLeagueDto } from './dto/update-league.dto';


@ApiTags('leagues')
@Controller('leagues')
export class LeagueController {
  constructor(
    private readonly leagueService: LeagueService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle ligue' })
  @ApiBody({ type: CreateLeagueDto })
  @ApiResponse({ status: 201, description: 'Ligue créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Erreur lors de la création.' })
  async create(@Body() createLeagueDto: CreateLeagueDto, @Request() req): Promise<Omit<League, "user">> {

    return this.leagueService.create(createLeagueDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les ligues' })
  @ApiResponse({ status: 200, description: 'Liste des ligues récupérée avec succès.' })
  async findAll(): Promise<Omit<League, "user">[]> {
    return this.leagueService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir une ligue par ID' })
  @ApiResponse({ status: 200, description: 'Ligue récupérée avec succès.' })
  @ApiResponse({ status: 404, description: 'Ligue non trouvée.' })
  async findOne(@Param('id') id: number): Promise<Omit<League, "user">> {
      return this.leagueService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour une ligue' })
  @ApiResponse({ status: 200, description: 'Ligue mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Ligue non trouvée.' })
  async update(
    @Param('id') id: number,
    @Body() updateLeagueDto: UpdateLeagueDto,
    @Request() req
  ): Promise<Omit<League, "user">> {
    return this.leagueService.update(id, updateLeagueDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une ligue' })
  @ApiResponse({ status: 200, description: 'Ligue supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Ligue non trouvée.' })
  async remove(@Param('id') id: number, @Request() req): Promise<{ message: string }> {
    await this.leagueService.remove(id, req.user);
    return { message: 'Ligue supprimée avec succès.' };
  }
}