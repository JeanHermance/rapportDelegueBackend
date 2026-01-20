import { PartialType } from '@nestjs/swagger';
import { CreateFokotanyDto } from './create-fokotany.dto';

export class UpdateFokotanyDto extends PartialType(CreateFokotanyDto) {}
