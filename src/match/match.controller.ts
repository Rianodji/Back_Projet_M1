import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
//import { CreateMatchDto } from './dto/create-match.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Match } from './entities/match.entity';

@ApiTags('matchs')
@Controller('matchs')
export class MatchController {
  /*constructor(private readonly matchService: MatchService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un match' })
  @ApiResponse({
    status: 201,
    description: 'Match créé avec succès',
    type: Match,
  })
  /*create(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchService.create(createMatchDto);
  }*/

/*  @Get()
  @ApiOperation({ summary: 'Obtenir tous les matchs' })
  @ApiResponse({
    status: 200,
    description: 'Retourne tous les matchs',
    type: [Match],
  })
  findAll(): Promise<Match[]> {
    return this.matchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un match par ID' })
  @ApiResponse({
    status: 200,
    description: 'Retourne un match',
    type: Match,
  })
  @ApiResponse({
    status: 404,
    description: 'Match non trouvé',
  })
  findOne(@Param('id') id: number): Promise<Match> {
    return this.matchService.findOne(id);
  }*/
}

