import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,  // On injecte le service des utilisateurs
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Récupère le token du header
      secretOrKey: process.env.JWT_SECRET,  // Clé secrète
    });
  }

  // Méthode de validation du payload du JWT
  async validate(payload: any): Promise<User> {
    // Vérification de l'existence du champ 'sub' dans le payload (id de l'utilisateur)
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    // Recherche de l'utilisateur dans la base de données à partir de l'ID
    const user = await this.usersService.findById(payload.sub);

    // Si l'utilisateur n'existe pas, on lance une exception
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Retourne l'utilisateur trouvé pour l'attacher à la requête
    return user;
  }
}