import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { Equipe } from './entities/equipes.entity';
import { User } from '../users/entities/user.entity';
import { LeagueModule } from '../league/league.module';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  controllers: [EquipesController],
  providers: [EquipesService],
  imports: [
  TypeOrmModule.forFeature([Equipe, User]),
  forwardRef(() => LeagueModule),
  forwardRef(() => AuthModule),
  forwardRef(() => CaslModule),
  
  ],
})
export class EquipesModule {}
