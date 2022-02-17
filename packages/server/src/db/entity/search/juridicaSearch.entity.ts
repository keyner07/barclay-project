import { BaseEntity, Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/User.entity";

@Entity("juridicaSearch")
export class JuridicaSearch extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    razonSocial: string;

    @Column({nullable: true})
    RNC: string;

    @Column({nullable: true})
    numMercantil: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    fechaConstitucionDomicilio: string;

    @Column({nullable: true})
    telefono: string;

    @Column({nullable: true})
    descripcionNegocio: string;

    @Column({nullable: true})
    principalesAccionistas: string;

    @Column({nullable: true})
    representantesLegales: string;

    @Column({nullable: true})
    copiaDelPoderRepresentacion: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    PEP: string;

    @ManyToOne(() => User)
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
