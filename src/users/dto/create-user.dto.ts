import { IsString, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  
  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur (doit être fort)',
    example: 'Password123!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}