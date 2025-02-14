import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context) {
    return super.canActivate(context);  // Le guard appelle automatiquement la stratégie 'jwt'
  }
}