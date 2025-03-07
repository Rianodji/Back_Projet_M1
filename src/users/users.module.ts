import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SanitizerModule } from '../sanitizer/sanitizer.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../role/role.module';

@Module({
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],  
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => SanitizerModule),
    forwardRef(() => AuthModule),
    forwardRef(() => RolesModule),  // ✅ une seule importation
  ],
  controllers: [],
})
export class UsersModule {}