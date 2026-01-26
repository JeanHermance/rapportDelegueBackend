import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, MinLength } from "class-validator";

export class CreateActiviteDto {
    @ApiProperty({example: "Titre de l'activite"})
    @MinLength(10)
    titre: string;

    @ApiProperty({example: "2026-01-26T16:58:44.000Z"})
    @IsDateString()
    date: Date;

    @ApiProperty({example: "idRubrique"})
    idRubrique: string;

    @ApiProperty({example: "idUtilisateur"})
    idUtilisateur: string;
}
