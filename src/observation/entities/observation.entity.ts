import { Activite } from "src/activite/entities/activite.entity";
import { PieceJointe } from "src/piece-jointe/entities/piece-jointe.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Observation')
export class Observation {
    @PrimaryGeneratedColumn('uuid')
    idObservation: string;

    @Column()
    description: string;

    @ManyToOne(() => Activite, (activite) => activite.observations)
    @JoinColumn({ name: 'idActivite' })
    activite: Activite;

    @OneToMany(() => PieceJointe, (pieceJointe) => pieceJointe.observation)
    pieceJointes: PieceJointe[]
}
