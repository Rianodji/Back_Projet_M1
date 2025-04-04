// MatchModule avec tous les imports nécessaires pour sécurité CASL et accès aux entités liées
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Journee } from '../journee/entities/journee.entity';
import { CaslModule } from '../casl/casl.module';
import { AuthModule } from '../auth/auth.module';
import { JourneeModule } from '../journee/journee.module';
import { EquipesModule } from '../equipes/equipes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Journee]),
    forwardRef(() => CaslModule),
    forwardRef(() => AuthModule),
    forwardRef(() => JourneeModule),
    forwardRef(() => EquipesModule),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService]
})
export class MatchModule {}
