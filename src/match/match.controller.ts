import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un match' })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les matchs' })
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un match par ID' })
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un match' })
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un match' })
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }
}
