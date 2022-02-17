import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../../../interfaces/search/search.enum";
import { EntitySearched } from "./EntitySearched.entity";
import { SearchInfo } from "./SearchInfo.entity";


@Entity('info-received')
export class InfoReceived extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    payload: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @OneToOne(() => SearchInfo, search => search.infoReceived)
    search: SearchInfo
}