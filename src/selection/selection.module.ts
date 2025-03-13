import { forwardRef, Module } from '@nestjs/common';
import { SelectionController } from './selection.controller';
import { SelectionService } from './selection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchModule } from 'match/match.module';
import { JoueurModule } from 'joueur/joueur.module';
import { EquipesModule } from 'equipes/equipes.module';
import { Selection } from './entities/selection.entity';

@Module({
  controllers: [SelectionController],
  providers: [SelectionService],
  imports:[
    TypeOrmModule.forFeature([Selection]),
    forwardRef(()=>MatchModule),
    forwardRef(()=>JoueurModule),
    forwardRef(()=>EquipesModule)
  ],
  exports:[SelectionService]
})
export class SelectionModule {}
