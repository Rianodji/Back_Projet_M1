import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, LocalStrategy,LocalAuthGuard],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({
      isGlobal: true,  // Cette option permet de rendre la configuration accessible globalement
    }),
    JwtModule.register({
        secret: process.env.JWT_SECRET,  // Récupère la clé JWT depuis le fichier .env
        signOptions: { expiresIn: '1h' },
      })
  ],
  exports: [AuthService,JwtStrategy, JwtAuthGuard, LocalStrategy,LocalAuthGuard]
})
export class AuthModule {}