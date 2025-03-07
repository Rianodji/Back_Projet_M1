import { forwardRef, Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { League } from './entities/league.entity';
import { SaisonModule } from 'saison/saison.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'users/users.module';


@Module({
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService],
  imports:[TypeOrmModule.forFeature([League]),
  forwardRef(()=> SaisonModule),
  forwardRef(() => UsersModule)
    ]
})
export class LeagueModule {}
