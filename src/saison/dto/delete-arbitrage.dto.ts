import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Importation des décorateurs Swagger
import { Transform } from 'class-transformer';

export class DeleteArbitrageDto {
    @ApiProperty({
        description: 'ID de la saison à laquelle l\'arbitre doit être associé',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))  // Transformation explicite en nombre
    saisonId: number;

    @ApiProperty({
        description: 'ID de l\'arbitre à associer à la saison',
        example: 2,
    })
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))  // Transformation explicite en nombre
    arbitreId: number;
}