import { Commune } from "src/commune/entities/commune.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Fokotany')
export class Fokotany {
    @PrimaryGeneratedColumn('uuid')
    idFokotany: string;

    @Column({unique: true})
    nomFokotany: string;

    @Column()
    descriptionFokotany: string;

    @Column()
    codeFokotany: string;

    @Column({type: 'json'})
    contactFokotany: Record<string, string>;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => Commune, (commune) => commune.fokotanys)
    @JoinColumn({ name: 'idCommune' })
    commune: Commune;
}
