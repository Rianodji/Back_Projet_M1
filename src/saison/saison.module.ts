import { Module } from '@nestjs/common';
import { SaisonController } from './saison.controller';
import { SaisonService } from './saison.service';

@Module({
  controllers: [SaisonController],
  providers: [SaisonService]
})
export class SaisonModule {}
