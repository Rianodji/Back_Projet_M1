import { IsString, IsNotEmpty, IsOptional, IsInt, Min, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArbitreDto {
  @ApiProperty({ description: "Nom de l'arbitre", example: "Dupont" })
  @IsString()
  @IsNotEmpty()
  nom: string;


  @ApiProperty({ description: "ID de la ligue à laquelle appartient l'arbitre", example: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  leagueId: number; 
}
