import { Module, forwardRef } from '@nestjs/common';
import { JoueurService } from './joueur.service';
import { JoueurController } from './joueur.controller';
import { Joueur } from './entities/joueur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { LeagueModule } from '../league/league.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Joueur]),
    forwardRef(() => AuthModule),
    forwardRef(() => CaslModule),
    forwardRef(()=>LeagueModule)
  ],
  controllers: [JoueurController],
  providers: [JoueurService],
  exports: [JoueurService, TypeOrmModule.forFeature([Joueur])],
})
export class JoueurModule {}

