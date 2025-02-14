import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
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
  exports: [JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}