import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Service pour créer le JWT
  ) {}

  // Méthode pour générer le hash du mot de passe
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Création du sel
    return bcrypt.hash(password, salt); // Hachage du mot de passe
  }

  // Méthode pour comparer le mot de passe envoyé avec celui stocké
  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword); // Comparaison des mots de passe
  }

  async validateUser(email: string, password: string) {
    // Recherche de l'utilisateur par email
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      throw new NotFoundException(`User with email ${email} not found or password is missing`); // Gestion d'erreur si utilisateur non trouvé ou si le mot de passe est manquant
    }
  
    // Comparaison du mot de passe envoyé avec celui haché
    const isPasswordValid = await this.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials'); // Erreur si mot de passe incorrect
    }

    // Récupération des rôles de l'utilisateur
    const roles = await this.usersService.getUserRolesById(user.id); // Récupération des noms de rôles
    if (!roles || roles.length === 0) {
      throw new UnauthorizedException('User has no roles'); // Gestion d'erreur si aucun rôle
    }
  
    return {userId: user.id ,roles: roles}
  }

  async login(loginDto: LoginDto) : Promise<{ token: string }> {
    
    const payload = await this.validateUser(loginDto.email, loginDto.password);
    const token = this.jwtService.sign(payload); // Génération du token JWT
  
    return { token };
  }
  

}