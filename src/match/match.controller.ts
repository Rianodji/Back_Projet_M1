// MatchController sécurisé avec JwtAuthGuard et @Request pour transmettre l'utilisateur
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Match } from './entities/match.entity';  

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un match' })
  create(@Body() createMatchDto: CreateMatchDto, @Request() req):Promise<Partial<Match>> {
    return this.matchService.create(createMatchDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les matchs' })
  findAll() :Promise<Partial<Match[]>> {
    return this.matchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un match par ID' })
  findOne(@Param('id') id: string) :Promise<Partial<Match>> {
    return this.matchService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un match' })
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto, @Request() req):Promise<Partial<Match>> {
    return this.matchService.update(+id, updateMatchDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un match' })
  remove(@Param('id') id: string, @Request() req):Promise<void> {
    return this.matchService.remove(+id, req.user);
  }
}
