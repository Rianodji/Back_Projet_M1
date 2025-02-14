import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) 
    private  roleRepository: Repository<Role>,
  ) {}

  // Créer un rôle
  async createRole(name: string): Promise<Role> {
    const role = this.roleRepository.create({ name });
    return await this.roleRepository.save(role);
  }

  // Récupérer tous les rôles
  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  // Récupérer un rôle par son ID
  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }
}