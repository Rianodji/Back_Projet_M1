import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateJoueurDto {
  @ApiProperty({ example: 'Rianodji', description: "Nom du joueur" })
  @IsString()
  nom: string;

  @ApiProperty({ example: 'Dicard', description: "Prénom du joueur" })
  @IsString()
  prenom: string;

  @ApiProperty({ example: '2002-05-15', description: "Date de naissance du joueur (format YYYY-MM-DD)" })
  @IsDateString()
  date_naissance: string;

  @ApiProperty({ example: 'Attaquant', description: "Poste du joueur (ex: Attaquant, Défenseur, Milieu, Gardien)" })
  @IsString()
  post: string;
}

