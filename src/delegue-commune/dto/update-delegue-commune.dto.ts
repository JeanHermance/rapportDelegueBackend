import { PartialType } from '@nestjs/swagger';
import { CreateDelegueCommuneDto } from './create-delegue-commune.dto';

export class UpdateDelegueCommuneDto extends PartialType(CreateDelegueCommuneDto) {}
