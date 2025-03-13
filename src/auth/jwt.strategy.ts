import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Récupère le token du header
      secretOrKey: process.env.JWT_SECRET,  // Clé secrète
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, roles: payload.roles };
  }
}