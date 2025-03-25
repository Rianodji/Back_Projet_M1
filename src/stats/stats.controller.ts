import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

 

  @Get('count/saisons')
  async getSaisonCount(): Promise<{ totalSaisons: number }> {
    return this.statsService.getSaisonCount();
  }

  @Get('count/joueurs')
  async getJoueurCount(): Promise<{ totalJoueurs: number }> {
    return this.statsService.getJoueurCount();
  }

  @Get('count/journees')
  async getJourneeCount(): Promise<{ totalJournees: number }> {
    return this.statsService.getJourneeCount();
  }

  @Get('count/equipes')
  async getEquipeCount(): Promise<{ totalEquipes: number }> {
    return this.statsService.getEquipeCount();
  }



   
}