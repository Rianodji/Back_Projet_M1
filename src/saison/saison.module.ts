import { forwardRef, Module } from '@nestjs/common';
import { SaisonController } from './saison.controller';
import { SaisonService } from './saison.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saison } from './entities/saison.entity';
import { Arbitrage } from './entities/arbitrage.entity';
import { ArbitreModule } from '../arbitre/arbitre.module';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { UsersModule } from '../users/users.module';
import { LeagueModule } from '../league/league.module';
import { Arbitre } from '../arbitre/entities/arbitre.entity';

@Module({
  controllers: [SaisonController],
  providers: [SaisonService],
  exports:[SaisonService, TypeOrmModule.forFeature([Saison, Arbitrage])],
  imports:[
    TypeOrmModule.forFeature([Saison, Arbitrage]),
    forwardRef(()=> ArbitreModule),
    forwardRef(()=>AuthModule),
    forwardRef(()=>CaslModule),
    forwardRef(()=>UsersModule),
    forwardRef(()=>LeagueModule),
    forwardRef(()=>Arbitre)
  ]
})
export class SaisonModule {}
