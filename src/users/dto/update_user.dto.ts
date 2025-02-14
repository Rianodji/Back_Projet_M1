import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Prénom de l\'utilisateur (optionnel)',
    example: 'John',
    required: false,  // Indique que ce champ est optionnel
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    description: 'Nom de l\'utilisateur (optionnel)',
    example: 'Doe',
    required: false,  // Indique que ce champ est optionnel
  })
  @IsOptional()
  @IsString()
  last_name?: string;
}