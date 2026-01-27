import { Auth } from "src/auth/entities/auth.entity";
import { Observation } from "src/observation/entities/observation.entity";
import { Rubrique } from "src/rubrique/entities/rubrique.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activite {
    @PrimaryGeneratedColumn('uuid')
    idActivite: string;

    @Column({type: 'timestamp'})
    date: Date;

    @Column()
    titre: string;

    @Column({type: 'boolean',default: false})
    statut: boolean;

    @CreateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne( () => Rubrique, (rubrique) => rubrique.activites)
    @JoinColumn({ name: 'idRubrique' })
    rubrique: Rubrique;

    @ManyToOne(() => Auth, (auth) => auth.activites)
    @JoinColumn({ name: 'idAuth' })
    auth: Auth;

    @OneToMany(() => Observation,(observation) => observation.activite)
    observations: Observation[];
}
