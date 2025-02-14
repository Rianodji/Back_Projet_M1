import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';  // Import des décorateurs Swagger
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Import du DTO

@ApiTags('Authentication')  // Tag pour grouper les routes liées à l'authentification
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })  // Description de l’opération
  @ApiBody({ type: LoginDto })  // Description du corps de la requête avec le DTO
  @ApiResponse({ status: 200, description: 'Connexion réussie, un token est retourné.' })  // Réponse si la connexion réussie
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })  // Réponse si les identifiants sont incorrects
  async login(@Body() loginDto: LoginDto) {
    // Le loginDto contient les informations envoyées dans le corps de la requête
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }
}