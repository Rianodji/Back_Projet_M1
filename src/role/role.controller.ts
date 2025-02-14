import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RolesService } from './role.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Créer un rôle
  @Post()
  async createRole(@Body('name') name: string): Promise<Role> {
    return this.rolesService.createRole(name);
  }

  // Récupérer tous les rôles
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  // Récupérer un rôle par son ID
  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return this.rolesService.getRoleById(id);
  }
}