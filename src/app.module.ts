import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  SanitizerModule } from './sanitizer/sanitizer.module';
import { RolesModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { LeagueModule } from './league/league.module';


@Module({
  imports: [
    // Charge le fichier .env en développement uniquement
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? [] : '.env',  // Si en prod, ne charge pas de fichier .env
      isGlobal: true,  // Les variables d'environnement sont accessibles globalement
    }),

    // Configuration de TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dbUrl = process.env.DB_URL;

        // Vérifie si la variable DB_URL est définie dans l'environnement
        if (!dbUrl) {
          throw new Error('DB_URL is not defined in environment variables');
        }

        return {
          type: 'postgres',
          url: dbUrl,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),

    UsersModule,
    SanitizerModule,
    RolesModule,
    AuthModule,
    LeagueModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}