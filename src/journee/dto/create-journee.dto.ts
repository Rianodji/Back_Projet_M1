import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateJourneeDto {
  @ApiProperty({ example: 1, description: 'Numéro de la journée' })
  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @ApiProperty({ example: '2024-03-20', description: 'Date de début de la journée' })
  @IsNotEmpty()
  @IsDateString()
  debut: Date;

  @ApiProperty({ example: '2024-03-21', description: 'Date de fin de la journée' })
  @IsNotEmpty()
  @IsDateString()
  fin: Date;

  @ApiProperty({ example: 5, description: "ID de la saison associée" })
  @IsNotEmpty()
  @IsNumber()
  saisonId: number;
}