import { ApiProperty } from "@nestjs/swagger";

export class CreateDelegueCommuneDto {
    @ApiProperty({description: 'Utilisateur ID', example: '123e4567-e89b-12d3-a456-426614174000'})
    idUtilisateur: string;

    @ApiProperty({description: 'Commune ID', example: '123e4567-e89b-12d3-a456-426614174000'})
    idCommune: string;
}
