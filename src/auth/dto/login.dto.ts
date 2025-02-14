import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Import de ApiProperty

export class LoginDto {
  @IsEmail()  // Vérifie que l'email est bien valide
  @ApiProperty({ 
    description: 'L\'email de l\'utilisateur pour se connecter',  // Description de la propriété
    example: 'user@example.com',  // Exemple d'email pour la documentation
  })
  email: string;

  @IsString()  // Vérifie que le mot de passe est une chaîne de caractères
  @ApiProperty({ 
    description: 'Le mot de passe de l\'utilisateur pour se connecter',  // Description de la propriété
    example: 'password123',  // Exemple de mot de passe pour la documentation
  })
  password: string;
}