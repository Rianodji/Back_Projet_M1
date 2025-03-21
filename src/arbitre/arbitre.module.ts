import { Module, forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arbitre } from './entities/arbitre.entity';
import { ArbitreController } from './arbitre.controller';
import { ArbitreService } from './arbitre.service';
import { LeagueModule } from '../league/league.module';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';

@Module({

  controllers: [ArbitreController],
  providers: [ArbitreService],
  imports: [
    TypeOrmModule.forFeature([Arbitre]), 
    forwardRef(() => LeagueModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CaslModule),
  ],
  exports: [ArbitreService,TypeOrmModule.forFeature([Arbitre])]
})
export class ArbitreModule {}
