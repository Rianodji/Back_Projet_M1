import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { Equipe } from './entities/equipes.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipe, User])],
  controllers: [EquipesController],
  providers: [EquipesService],
})
export class EquipesModule {}
