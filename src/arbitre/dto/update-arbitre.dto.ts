import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArbitreDto {
  @ApiProperty({ description: "Identifiant de l'arbitre (optionnel)", example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @ApiProperty({ description: "Nom de l'arbitre (optionnel)", example: "Dupont", required: false })
  @IsOptional()
  @IsString()
  nom?: string;
}
