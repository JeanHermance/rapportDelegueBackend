import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsObject, IsString } from "class-validator";

export class CreateCommuneDto {
    @ApiProperty({ description: "Nom de la commune"})
    @IsString()
    nomCommune: string;

    @ApiProperty({ description: "Description de la commune"})
    @IsString()
    descriptionCommune: string;

    @ApiProperty({ description: "Code de la commune"})
    @IsString()
    codeCommune: string;

    @ApiProperty({ description: "Contact de la commune",example: '{"airtel": "0612345678", "orange": "0612345678"}'})
    @Transform(
        ({ value }) => {
            if (typeof value === 'string') {
                return JSON.parse(value);
            }
            return value;
        }

    )
    @IsObject()
    contactCommune: Record<string, string>;

    @ApiProperty({ description: "Email de la commune"})
    @IsEmail()
    emailCommune: string;

    @ApiProperty({ description: "Logo de la commune", format: "binary"})
    logoCommune: string;
}
