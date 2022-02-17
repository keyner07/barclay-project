import { BaseEntity, Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../../../interfaces/search/search.enum";
import { InfoReceived } from "./infoReceived.entity";
import { SearchInfo } from "./SearchInfo.entity";


@Entity("entity-serched")
export class EntitySearched extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    uuid: string

    @Column("text")
    tipoPersona: CategoryEnum

    @Column()
    ID: string;

    @Column()
    fullName: string

    @Column()
    nacionality: string

    @Column({nullable: true})
    birthday: string

    @Column()
    gender:  string

    @Column() 
    civilState: string

    @Column()
    address: string

    @Column()
    img: string

    @Column({default: false})
    taxpayer: Boolean;

    @Column({ nullable: true })
    sinceTaxPayer: string;

    @Column({default: 0})
    riskValue: number

    @OneToOne(() => SearchInfo, searchInfo => searchInfo.entitySearched)
    searchInfo: SearchInfo;


}
