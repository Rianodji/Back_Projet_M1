import { Module } from '@nestjs/common';
import { RolesService } from './role.service';
import { RolesController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],  // ✅ Définition du repository
  exports: [RolesService, TypeOrmModule], // ✅ On exporte TypeOrmModule pour que d'autres modules puissent l'utiliser
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}