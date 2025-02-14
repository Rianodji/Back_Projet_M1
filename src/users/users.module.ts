import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SanitizerModule } from 'src/sanitizer/sanitizer.module';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/role/role.module';

@Module({
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],  
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => SanitizerModule),
    forwardRef(() => AuthModule),
    forwardRef(() => RolesModule),  // ✅ Correction ici (une seule importation)
  ],
  controllers: [UsersController],
})
export class UsersModule {}