import { ApiProperty } from "@nestjs/swagger";

export class CreateObservationDto {
    @ApiProperty({
        description: 'Description de l\'observation',
        example: 'Observation de l\'agent',
    })
    description: string;

    @ApiProperty({description: "Id de l'activite", example: "idActivite"})
    idActivite: string;

}
