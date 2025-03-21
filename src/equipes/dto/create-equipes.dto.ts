import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipeDto {
  @ApiProperty({ description: "Nom de l'équipe", example: "Les Lions" })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: "Ville de l'équipe", example: "Paris" })
  @IsString()
  @IsNotEmpty()
  ville: string;
}
