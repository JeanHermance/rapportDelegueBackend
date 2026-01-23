import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Rubrique')
export class Rubrique {
    @PrimaryGeneratedColumn('uuid')
    idRubrique: string;

    @Column({unique: true})
    nomRubrique: string;

    @Column({nullable: true})
    descriptionRubrique: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
