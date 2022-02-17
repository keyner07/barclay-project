import { BaseEntity, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../../../interfaces/search/search.enum";
import { Report } from "../reports/Reports.entity";
import { User } from "../users/User.entity";
import { EntitySearched } from "./EntitySearched.entity";
import { InfoReceived } from "./infoReceived.entity";
import { ResultFound } from "./Results.entity";
import { RiskMatrixResults } from "./RiskMatrixResult.entity";


@Entity('search-info')
export class SearchInfo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    uuid: string

    @OneToOne(() => EntitySearched, searched => searched.searchInfo)
    @JoinColumn()
    entitySearched: EntitySearched

    @OneToOne(() => RiskMatrixResults, risk => risk.searchInfo)
    @JoinColumn()
    riskMatrixResult: RiskMatrixResults;

    @OneToMany(() => ResultFound, result => result.searchInfo)
    results: ResultFound[];
    
    @OneToOne(() => InfoReceived, info => info.search)
    @JoinColumn()
    infoReceived: InfoReceived;

    @OneToMany(() => Report, report => report.search)
    reports: Report[];

    @ManyToOne(() => User, user => user.searchList)
    user: User;

    @Column({type: "enum", enum: CategoryEnum, nullable: true})
    type: CategoryEnum;

    @CreateDateColumn()
    createdAt: Date;
}