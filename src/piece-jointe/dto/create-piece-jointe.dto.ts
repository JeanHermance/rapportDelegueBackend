import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreatePieceJointeDto {
    @ApiProperty({type: 'string', format: "binary" ,description: "Piece Jointe"})
    fichier: string;

    @ApiProperty({type: 'string',description: "idObservation"})
    idObservation: string;

}
