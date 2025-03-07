import { Module } from '@nestjs/common';
import { SaisonController } from './saison.controller';
import { SaisonService } from './saison.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saison } from './entities/saison.entity';

@Module({
  controllers: [SaisonController],
  providers: [SaisonService],
  exports:[SaisonService],
  imports:[TypeOrmModule.forFeature([Saison])]
})
export class SaisonModule {}
