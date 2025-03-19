import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arbitre } from './entities/arbitre.entity';
import { CreateArbitreDto } from './dto/create-arbitre.dto';
import { UpdateArbitreDto } from './dto/update-arbitre.dto';

@Injectable()
export class ArbitreService {
  constructor(
    @InjectRepository(Arbitre)
    private readonly arbitreRepository: Repository<Arbitre>
  ) {}

  async create(createArbitreDto: CreateArbitreDto): Promise<Arbitre> {
    const arbitre = this.arbitreRepository.create(createArbitreDto);
    return this.arbitreRepository.save(arbitre);
  }

  async findAll(): Promise<Arbitre[]> {
    return this.arbitreRepository.find();
  }

  async findOne(id: number): Promise<Arbitre> {
    const arbitre = await this.arbitreRepository.findOne({ where: { id } });
    if (!arbitre) {
      throw new NotFoundException('Arbitre non trouvé');
    }
    return arbitre;
  }

  async update(id: number, updateArbitreDto: UpdateArbitreDto): Promise<Arbitre> {
    const arbitre = await this.arbitreRepository.preload({
      id,
      ...updateArbitreDto,
    });

    if (!arbitre) {
      throw new NotFoundException('Arbitre non trouvé');
    }

    return this.arbitreRepository.save(arbitre);
  }

  async remove(id: number): Promise<void> {
    const arbitre = await this.findOne(id);
    await this.arbitreRepository.remove(arbitre);
  }
}
