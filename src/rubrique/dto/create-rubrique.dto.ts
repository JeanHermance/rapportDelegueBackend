import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRubriqueDto {
    @ApiProperty({description: "Nom de la rubrique" ,example: "Descente au niveau fokotany"})
    @IsString()
    nomRubrique: string;

    @ApiProperty({description: "Description de la rubrique" ,example: "Descente au niveau fokotany"})
    @IsString()
    descriptionRubrique: string;
}
