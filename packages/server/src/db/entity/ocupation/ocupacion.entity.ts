import { BaseEntity, Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("ocupaciones")
export class Ocupacion extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Generated("uuid")
    uuid: string;

    @Column()
    nombreOcupacion: string;
}
