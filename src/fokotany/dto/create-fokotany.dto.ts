import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsObject, IsOptional, IsString } from "class-validator";

export class CreateFokotanyDto {
    @ApiProperty({description: 'Nom du fokotany', example: 'Fokotany 1'})
    @IsString()
    nomFokotany: string;

    @ApiProperty({description: 'Description du fokotany', example: 'Description du fokotany'})
    @IsString()
    @IsOptional()
    descriptionFokotany: string;

    @ApiProperty({description: 'Code du fokotany', example: 'Code du fokotany'})
    @IsString()
    codeFokotany: string;

    @ApiProperty({description: 'Commune du fokotany', example: 'Commune du fokotany'})
    @IsString()
    idCommune: string;

    @ApiProperty({description: 'Contact du fokotany', example: '{"airtel": "0612345678", "orange": "0612345678"}'})
    @Transform(
        ({ value }) => {
            if (typeof value === 'string') {
                return JSON.parse(value);
            }
            return value;
        }
    )
    @IsObject()
    contactFokotany: Record<string, string>;
}
