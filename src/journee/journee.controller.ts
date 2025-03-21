import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Param, 
    Body, 
    UseGuards, 
    Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JourneeService } from './journee.service';
import { CreateJourneeDto } from './dto/create-journee.dto';
import { UpdateJourneeDto } from './dto/update-journee.dto';
import { Journee } from './entities/journee.entity';

@ApiTags('journees') // Groupe les endpoints sous "Journées" dans Swagger
@Controller('journee')
export class JourneeController {
    constructor(private readonly journeeService: JourneeService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Trouver une journée par ID' })
    @ApiResponse({ status: 200, description: 'Journée trouvée avec succès' })
    @ApiResponse({ status: 404, description: 'Journée non trouvée' })
    async findOne(@Param('id') id: number): Promise<Partial<Journee>> {
        return this.journeeService.findOne(id);
    }

    @Get()
    @ApiOperation({ summary: 'Lister toutes les journées' })
    @ApiResponse({ status: 200, description: 'Liste des journées récupérée avec succès' })
    async findAll():  Promise<Partial<Journee>[]> {
        return this.journeeService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Créer une nouvelle journée' })
    @ApiResponse({ status: 201, description: 'Journée créée avec succès' })
    @ApiResponse({ status: 403, description: 'Accès interdit' })
    async create(@Body() createJourneeDto: CreateJourneeDto, @Request() req): Promise<Partial<Journee>> {
        return this.journeeService.create(createJourneeDto, req.user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mettre à jour une journée' })
    @ApiResponse({ status: 200, description: 'Journée mise à jour avec succès' })
    @ApiResponse({ status: 403, description: 'Accès interdit' })
    @ApiResponse({ status: 404, description: 'Journée non trouvée' })
    async update(@Param('id') id: number, @Body() updateJourneeDto: UpdateJourneeDto, @Request() req): Promise<Partial<Journee>> {
        return this.journeeService.update(id, updateJourneeDto, req.user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Supprimer une journée' })
    @ApiResponse({ status: 200, description: 'Journée supprimée avec succès' })
    @ApiResponse({ status: 403, description: 'Accès interdit' })
    @ApiResponse({ status: 404, description: 'Journée non trouvée' })
    async remove(@Param('id') id: number, @Request() req): Promise<void> {
        return this.journeeService.remove(id, req.user);
    }
}