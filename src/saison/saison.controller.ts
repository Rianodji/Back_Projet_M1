import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { CreateSaisonDto } from './dto/create-saison.dto';
import { SaisonService } from './saison.service';
import { Saison } from './entities/saison.entity';

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
}