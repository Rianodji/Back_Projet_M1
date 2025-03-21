import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Importation des décorateurs Swagger

export class CreateArbitrageDto {
    @ApiProperty({
        description: 'ID de la saison à laquelle l\'arbitre doit être associé',
        example: 1,  // Exemple de valeur pour la documentation
    })
    @IsInt()
    @IsNotEmpty()
    saisonId: number;

    @ApiProperty({
        description: 'ID de l\'arbitre à associer à la saison',
        example: 2,  // Exemple de valeur pour la documentation
    })
    @IsInt()
    @IsNotEmpty()
    arbitreId: number;
}