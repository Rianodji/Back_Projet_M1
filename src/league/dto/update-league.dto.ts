import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateLeagueDto } from './create-league.dto';

export class UpdateLeagueDto extends PartialType(CreateLeagueDto) {
  @ApiProperty({
    description: "Nom affiché de la ligue",
    example: "Ligue 1",
    required: false,
  })
  @IsOptional()
  @IsString()
  display_name?: string;

  @ApiProperty({
    description: "Pays de la ligue",
    example: "France",
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;
}