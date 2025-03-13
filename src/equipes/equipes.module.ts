import { Module } from '@nestjs/common';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipe } from './entities/equipes.entity';

@Module({
  controllers: [EquipesController],
  providers: [EquipesService],
  exports:[EquipesModule],
  imports:[TypeOrmModule.forFeature([Equipe])]
})
export class EquipesModule {}
