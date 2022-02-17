import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { EnumTypeReports } from "../../../interfaces/reportes/reportes.enum";
import { SearchInfo } from "../search/SearchInfo.entity";

@Entity("reports")
export class Report extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    payload: object;

    @Column()
    searchId: number;

    @Column({ type: "enum", enum: EnumTypeReports, default: EnumTypeReports.ROS })
    type: EnumTypeReports;

    @ManyToOne(() => SearchInfo, search => search.reports)
    @JoinColumn({ name: "searchId", referencedColumnName: "id"})
    search: SearchInfo;
}