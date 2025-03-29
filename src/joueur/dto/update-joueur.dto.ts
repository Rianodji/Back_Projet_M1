import { PartialType } from '@nestjs/swagger';
import { CreateJoueurDto } from './create-joueur.dto';

export class UpdateJoueurDto extends PartialType(CreateJoueurDto) {}

