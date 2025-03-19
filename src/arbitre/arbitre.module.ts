import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arbitre } from './entities/arbitre.entity';
import { ArbitreController } from './arbitre.controller';
import { ArbitreService } from './arbitre.service';

@Module({
  controllers: [ArbitreController],
  providers: [ArbitreService],
  imports: [TypeOrmModule.forFeature([Arbitre])],
  exports: [ArbitreService],
})
export class ArbitreModule {}
