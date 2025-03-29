import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = this.matchRepository.create(createMatchDto);
    return await this.matchRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find({ relations: ['journee', 'matchEquipes', 'matchArbitres', 'selections'] });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({ where: { id }, relations: ['journee', 'matchEquipes', 'matchArbitres', 'selections'] });
    if (!match) throw new NotFoundException('Match non trouvé');
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match> {
    await this.matchRepository.update(id, updateMatchDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.matchRepository.delete(id);
  }
}

