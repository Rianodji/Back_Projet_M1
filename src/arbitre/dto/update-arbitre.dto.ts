import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArbitreDto {
  @ApiProperty({ description: "Nom de l'arbitre (optionnel)", example: "Dupont", required: false })
  @IsOptional()
  @IsString()
  nom?: string;
}
