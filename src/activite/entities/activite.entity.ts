import { Auth } from "src/auth/entities/auth.entity";
import { Rubrique } from "src/rubrique/entities/rubrique.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activite {
    @PrimaryGeneratedColumn('uuid')
    idActivite: string;

    @Column({type: 'timestamp'})
    date: Date;

    @Column()
    titre: string;

    @CreateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne( () => Rubrique, (rubrique) => rubrique.activites)
    rubrique: Rubrique;

    @ManyToOne(() => Auth, (auth) => auth.activites)
    auth: Auth;
}
