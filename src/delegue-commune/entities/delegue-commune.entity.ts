import { Auth } from "src/auth/entities/auth.entity";
import { Commune } from "src/commune/entities/commune.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('delegueCommune')
export class DelegueCommune {
    @PrimaryGeneratedColumn('uuid')
    idDelegueCommune: string;

    @ManyToOne(()=> Auth, (auth)=> auth.delegueCommunes)
    @JoinColumn({ name: 'idUtilisateur' })
    utilisateur: Auth;

    @ManyToOne(()=> Commune, (commune)=> commune.delegueCommunes)
    @JoinColumn({ name: 'idCommune' })
    commune: Commune;

    @Column({type: 'boolean', default: true})
    statusDelegueCommune: boolean;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
