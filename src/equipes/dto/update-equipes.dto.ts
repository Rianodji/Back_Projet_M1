import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEquipeDto {
  @ApiProperty({ description: "Nom de l'équipe (optionnel)", example: "Les Tigres", required: false })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiProperty({ description: "Ville de l'équipe (optionnel)", example: "Lyon", required: false })
  @IsOptional()
  @IsString()
  ville?: string;
}
