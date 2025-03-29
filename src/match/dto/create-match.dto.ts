import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../entities/match.entity';

export class CreateMatchDto {
  @ApiProperty({ example: 1, description: "Identifiant de la journée" })
  journeeId: number;

  @ApiProperty({ example: 2, description: "Score de l'équipe 1" })
  score_equipe1: number;

  @ApiProperty({ example: 1, description: "Score de l'équipe 2" })
  score_equipe2: number;

  @ApiProperty({ example: '2025-06-15T14:00:00.000Z', description: "Date du match" })
  date: Date;

  @ApiProperty({ example: Status.EN_COURS, description: "Statut du match" })
  status: Status;
}

