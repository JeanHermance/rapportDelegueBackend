import { Matches } from "class-validator";
import { Observation } from "src/observation/entities/observation.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("piece_jointe")
export class PieceJointe {
    @PrimaryGeneratedColumn('uuid')
    idPieceJointe: string;

    @Column()
    nomPieceJointe: string;

    @Column()
    urlPieceJointe: string;

    @Column()
    typePieceJointe: string;

    @Column({type: 'bigint'})
    taillePieceJointe: number;

    @ManyToOne(()=> Observation,(observation) => observation.pieceJointes)
    @JoinColumn({name: 'idObservation'})
    observation: Observation;
}
