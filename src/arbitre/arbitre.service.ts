import { Injectable, NotFoundException } from '@nestjs/common';
/*import { CreateArbitreDto } from './dto/create-arbitre.dto';
import { UpdateArbitreDto } from './dto/update-arbitre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arbitre } from './entities/arbitre.entity'; */

@Injectable()
export class ArbitreService {
  /*constructor(
    @InjectRepository(Arbitre)
    private arbitreRepository: Repository<Arbitre>,
  ) {}

  // Créer un arbitre
  async create(createArbitreDto: CreateArbitreDto): Promise<Arbitre> {
    const arbitre = this.arbitreRepository.create(createArbitreDto);
    return await this.arbitreRepository.save(arbitre);
  }

  // Récupérer un arbitre par son ID
  async findOneById(id: number): Promise<Arbitre> {
    const arbitre = await this.arbitreRepository.findOne(id);
    if (!arbitre) {
      throw new NotFoundException(`Arbitre avec l'ID ${id} non trouvé.`);
    }
    return arbitre;
  }

  // Mettre à jour un arbitre par son ID
  async update(id: number, updateArbitreDto: UpdateArbitreDto): Promise<Arbitre> {
    const arbitre = await this.findOneById(id); // Vérifie si l'arbitre existe
    if (!arbitre) {
      throw new NotFoundException(`Arbitre avec l'ID ${id} non trouvé.`);
    }

    // Met à jour l'arbitre
    await this.arbitreRepository.update(id, updateArbitreDto);

    // Récupère l'arbitre mis à jour
    return await this.findOneById(id);
  }*/
}
