import { Module } from '@nestjs/common';
import { JoueurController } from './joueur.controller';
import { JoueurService } from './joueur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joueur } from './entities/joueur.entity';

@Module({
  controllers: [JoueurController],
  providers: [JoueurService],
  exports:[JoueurService],
  imports:[TypeOrmModule.forFeature([Joueur])]
})
export class JoueurModule {}
