import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Delete, 
    Patch, 
    UseGuards, 
    Request 
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CreateSaisonDto } from './dto/create-saison.dto';
  import { UpdateSaisonDto } from './dto/update-saison.dto';
  import { SaisonService } from './saison.service';
  import { Saison } from './entities/saison.entity';
import { CreateArbitrageDto } from './dto/create-arbitrage.dto';
  
  @ApiTags('saisons') // Regroupe les endpoints sous l'onglet "Saisons" dans Swagger
  @Controller('saison')
  export class SaisonController {
      constructor(private readonly saisonService: SaisonService) {}
  
      @Post()
      @UseGuards(JwtAuthGuard)
      @ApiBearerAuth() // Indique que ce endpoint nécessite un token JWT
      @ApiOperation({ summary: 'Créer une nouvelle saison' })
      @ApiResponse({ status: 201, description: 'Saison créée avec succès' })
      @ApiResponse({ status: 403, description: 'Accès interdit' })
      async post(@Body() postSaison: CreateSaisonDto, @Request() req): Promise<Partial<Saison>> {
          return this.saisonService.create(postSaison, req.user);
      }
  
      // Récupérer une saison par son ID (public)
      @Get(':id')
      @ApiOperation({ summary: 'Récupérer une saison par son ID' })
      @ApiResponse({ status: 200, description: 'Saison trouvée' })
      @ApiResponse({ status: 404, description: 'Saison non trouvée' })
      async getOne(@Param('id') id: string): Promise<Partial<Saison>> {
          return this.saisonService.findOne(+id);
      }
  
      // Récupérer toutes les saisons (public)
      @Get()
      @ApiOperation({ summary: 'Récupérer toutes les saisons' })
      @ApiResponse({ status: 200, description: 'Liste des saisons' })
      async getAll(): Promise<Partial<Saison>[]> {
          return this.saisonService.findAll();
      }
  
      // Supprimer une saison (nécessite authentification)
      @Delete(':id')
      @UseGuards(JwtAuthGuard)
      @ApiBearerAuth()
      @ApiOperation({ summary: 'Supprimer une saison' })
      @ApiResponse({ status: 200, description: 'Saison supprimée' })
      @ApiResponse({ status: 403, description: 'Accès interdit' })
      async delete(@Param('id') id: string, @Request() req): Promise<void> {
          return this.saisonService.remove(+id, req.user);
      }
  
      // Modifier une saison (nécessite authentification)
      @Patch(':id')
      @UseGuards(JwtAuthGuard)
      @ApiBearerAuth()
      @ApiOperation({ summary: 'Modifier une saison' })
      @ApiResponse({ status: 200, description: 'Saison mise à jour' })
      @ApiResponse({ status: 403, description: 'Accès interdit' })
      async update(
          @Param('id') id: string, 
          @Body() updateSaisonDto: UpdateSaisonDto, 
          @Request() req
      ): Promise<Partial<Saison>> {
          return this.saisonService.update(+id, updateSaisonDto, req.user);
    }

    @Post('arbitrage')  // Route POST pour associer un arbitre à une saison
    @UseGuards(JwtAuthGuard)  // Le guard d'authentification JWT est utilisé ici
    @ApiBearerAuth()  // Indique que ce endpoint nécessite un token JWT
    @ApiOperation({ summary: 'Associer un arbitre à une saison' })  // Description de l'opération
    @ApiResponse({ status: 201, description: 'Arbitre associé à la saison avec succès' })  // Réponse de succès
    @ApiResponse({ status: 403, description: 'Accès interdit' })  // Réponse d'accès interdit si non autorisé
    @ApiResponse({ status: 404, description: 'Saison ou arbitre non trouvé' })  // Si la saison ou l’arbitre n’est pas trouvé
    async addArbitreToSaison(@Body() createArbitrageDto: CreateArbitrageDto, @Request() req): Promise<any> {
        return this.saisonService.addArbitreToSaison(createArbitrageDto, req.user);
    }
  }