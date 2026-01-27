import { PartialType } from '@nestjs/swagger';
import { CreatePieceJointeDto } from './create-piece-jointe.dto';

export class UpdatePieceJointeDto extends PartialType(CreatePieceJointeDto) {}
