import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLeagueDto {
  @ApiProperty({
    description: "Nom affiché de la ligue",
    example: "Ligue 1",
  })
  @IsString()
  @IsNotEmpty()
  display_name: string;

  @ApiProperty({
    description: "Pays de la ligue",
    example: "France",
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}