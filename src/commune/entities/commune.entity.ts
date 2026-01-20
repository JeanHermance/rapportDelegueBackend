import { Fokotany } from "src/fokotany/entities/fokotany.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Commune')
export class Commune {
    @PrimaryGeneratedColumn('uuid')
    idCommune: string;

    @Column({unique: true})
    nomCommune: string;

    @Column({nullable: true})
    descriptionCommune: string;

    @Column({unique: true})
    codeCommune: string;

    @Column({type: 'json'})
    contactCommune: Record<string, string>;

    @Column({unique: true})
    emailCommune: string;

    @Column({ type: 'varchar'})
    logoCommune: string;

    @Column({default: true})
    statusCommune: boolean;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @OneToMany(() => Fokotany, (fokotany) => fokotany.commune)
    fokotanys: Fokotany[];
}
