import { Module } from '@nestjs/common';
import { JoueurController } from './joueur.controller';
import { JoueurService } from './joueur.service';

@Module({
  controllers: [JoueurController],
  providers: [JoueurService]
})
export class JoueurModule {}
