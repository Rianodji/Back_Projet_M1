import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { JoueurService } from './joueur.service';
//import { CreateJoueurDto } from './dto/create-joueur.dto.ts';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Joueur } from './entities/joueur.entity';

@ApiTags('joueur')
@Controller('joueurs')
export class JoueurController {
  /*constructor(private readonly joueurService: JoueurService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un joueur' })
  @ApiResponse({ status: 201, description: 'Le joueur a été créé.', type: Joueur })
  @ApiResponse({ status: 400, description: 'Mauvaise requête' })
  create(@Body() createJoueurDto: CreateJoueurDto): Promise<Joueur> {
    return this.joueurService.create(createJoueurDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les joueurs' })
  @ApiResponse({ status: 200, description: 'Retourne la liste de tous les joueurs.', type: [Joueur] })
  findAll(): Promise<Joueur[]> {
    return this.joueurService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un joueur par son ID' })
  @ApiResponse({ status: 200, description: 'Retourne un joueur', type: Joueur })
  @ApiResponse({ status: 404, description: 'Joueur non trouvé' })
  findOne(@Param('id') id: number): Promise<Joueur> {
    return this.joueurService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un joueur' })
  @ApiResponse({ status: 200, description: 'Le joueur a été mis à jour.', type: Joueur })
  update(@Param('id') id: number, @Body() updateJoueurDto: CreateJoueurDto): Promise<Joueur> {
    return this.joueurService.update(id, updateJoueurDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un joueur' })
  @ApiResponse({ status: 200, description: 'Le joueur a été supprimé.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.joueurService.remove(id);
  }*/
}

