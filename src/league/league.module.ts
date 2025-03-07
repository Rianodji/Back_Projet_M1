import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {}

@Module({
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService]
})
export class LeagueModule {}
