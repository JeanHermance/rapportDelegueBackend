import { Activite } from "src/activite/entities/activite.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Observation')
export class Observation {
    @PrimaryGeneratedColumn('uuid')
    idObservation: string;

    @Column()
    description: string;

    @ManyToOne(() => Activite, (activite) => activite.observations)
    @JoinColumn({ name: 'idActivite' })
    activite: Activite;
}
