import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  // Créer un match
  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = this.matchRepository.create(createMatchDto);
    return await this.matchRepository.save(match);
  }

  // Trouver tous les matchs
  async findAll(): Promise<Match[]> {
    return this.matchRepository.find();
  }

  // Trouver un match par ID
  async findOne(id: number): Promise<Match> {
    return this.matchRepository.findOne(id);
  }
}

