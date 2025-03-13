import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateSaisonDto {
  @ApiProperty({
    description: "Date de début de la saison (format: YYYY-MM-DD)",
    example: "2025-08-15"
  })
  @IsDateString()
  debut: string;

  @ApiProperty({
    description: "Date de fin de la saison (format: YYYY-MM-DD)",
    example: "2026-05-30"
  })
  @IsDateString()
  fin: string;

  @ApiProperty({
    description: "Nombre total d'équipes participant à la saison",
    example: 20
  })
  @IsInt()
  @Min(1)
  nb_equipe: number;

  @ApiProperty({
    description: "Nombre total d'arbitres affectés à la saison",
    example: 10
  })
  @IsInt()
  @Min(1)
  nb_arbitre: number;

  @ApiProperty({
    description: "Nombre maximum de remplacements autorisés par match",
    example: 5
  })
  @IsInt()
  @Min(1)
  nb_remplacement: number;

  @ApiProperty({
    description: "ID de la ligue à laquelle appartient la saison",
    example: 1
  })
  @IsInt()
  @Min(1)
  league: number;
}