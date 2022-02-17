import { BaseEntity, Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SearchInfo } from "./SearchInfo.entity";

@Entity("risk-matrix-results")
export class RiskMatrixResults extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated("uuid")
    uuid: string;

    @Column({ default: false })
    politicamenteExpuesto: boolean;

    @Column({ default: false })
    extranjero: boolean;

    @Column({ default: false })
    paisesListaNegraGrys: boolean;

    @Column({ default: false })
    listaOfac: boolean;

    @Column({ default: false })
    efectivoEncimaUmbral: boolean;

    @Column({ default: false })
    informacionIncompleta: boolean;

    @Column({ default: false })
    representacionDeTercero: boolean;

    @Column({ default: false })
    DocumentoNoVerificado: boolean;

    @Column({ default: false })
    antecedentesLavado: boolean;

    @OneToOne(() => SearchInfo, (searchInfo) => searchInfo.riskMatrixResult)
    searchInfo: SearchInfo;
}
