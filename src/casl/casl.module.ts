import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { LeagueInterface } from './interfaces/league.interface';
import { UserInterface } from './interfaces/user.interface';

@Module({
    providers:[CaslAbilityFactory,LeagueInterface,UserInterface],
    exports:[CaslAbilityFactory,LeagueInterface,UserInterface]
})
export class CaslModule {}
