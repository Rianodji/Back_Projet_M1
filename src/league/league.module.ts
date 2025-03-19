import { LeagueService } from './league.service';
import { forwardRef, Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { League } from './entities/league.entity';
import { SaisonModule } from '../saison/saison.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';


@Module({
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService, TypeOrmModule.forFeature([League])],
  imports: [
    TypeOrmModule.forFeature([League]),
    forwardRef(() => SaisonModule),
    forwardRef(() => UsersModule),  // Assurer que UsersModule est bien importé
    forwardRef(() => AuthModule),
    forwardRef(()=>CaslModule)
  ],
})
export class LeagueModule {}