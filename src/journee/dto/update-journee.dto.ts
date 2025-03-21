import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJourneeDto } from './create-journee.dto';
import { IsNumber, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateJourneeDto extends PartialType(CreateJourneeDto) {
  @ApiProperty({ example: 2, description: 'Numéro de la journée', required: false })
  @IsOptional()
  @IsNumber()
  numero?: number;

  @ApiProperty({ example: '2024-03-22', description: 'Date de début de la journée', required: false })
  @IsOptional()
  @IsDateString()
  debut?: Date;

  @ApiProperty({ example: '2024-03-23', description: 'Date de fin de la journée', required: false })
  @IsOptional()
  @IsDateString()
  fin?: Date;

  @ApiProperty({ example: 5, description: "ID de la saison associée" })
  @IsNotEmpty()
  @IsNumber()
  saisonId: number;
}