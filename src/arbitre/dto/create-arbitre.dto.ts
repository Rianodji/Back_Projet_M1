import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArbitreDto {
  @ApiProperty({ description: "Identifiant de l'arbitre", example: 1 })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ description: "Nom de l'arbitre", example: "Dupont" })
  @IsString()
  @IsNotEmpty()
  nom: string;
}
