import { forwardRef, Module } from '@nestjs/common';
import { JourneeController } from './journee.controller';
import { JourneeService } from './journee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journee } from './entities/journee.entity';
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { SaisonModule } from '../saison/saison.module';

@Module({
  controllers: [JourneeController],
  providers: [JourneeService],
  exports:[JourneeService],
  imports:[
    TypeOrmModule.forFeature([Journee]),
    forwardRef(()=>AuthModule),
    forwardRef(()=>CaslModule),
    forwardRef(()=>SaisonModule)
  ]
})
export class JourneeModule {}
