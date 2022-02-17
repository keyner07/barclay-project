import { BaseEntity, Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SearchInfo } from "./SearchInfo.entity";


@Entity('results-found')
export class ResultFound extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated('uuid')
    uuid: string;

    @Column()
    title: string;

    @Column({nullable: true})
    date: Date;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    formattedUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => SearchInfo, search => search.results)
    searchInfo: SearchInfo;
}