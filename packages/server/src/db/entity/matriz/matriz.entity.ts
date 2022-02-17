import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { nivelRiesgoFormula } from "../../../helpers/nivelRiesgo";

import { User } from "../users/User.entity";

@Entity("matriz")
export class Matriz extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column({ default: null })
    tipo_riesgo: string;

    @Column({ default: 0 })
    probabilidad: number;

    @Column({ default: 0 })
    gravedad: number;

    @Column({ default: 0 })
    valor_riesgo: number;

    @Column({ nullable: true })
    nivel_riesgo: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    calcularResultado() {
        const valor = this.probabilidad * this.gravedad;
        const Get_nivel_riesgo = nivelRiesgoFormula(valor);
        console.log({ Get_nivel_riesgo });
        this.nivel_riesgo = Get_nivel_riesgo;
        this.valor_riesgo = valor;
        return;
    }

    @BeforeUpdate()
    calcularNivelRiesgo() {
        const valor = this.probabilidad * this.gravedad;
        const Get_nivel_riesgo = nivelRiesgoFormula(valor);
        console.log({ Get_nivel_riesgo });
        this.nivel_riesgo = Get_nivel_riesgo;
        this.valor_riesgo = valor;
        return;
    }
}
