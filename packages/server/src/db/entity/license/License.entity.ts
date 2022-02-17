import { BaseEntity, Column, CreateDateColumn, Entity, Generated, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Feature } from "./Feature.entity";
import { LicenseUser } from "./LicenseUsers.entity";

@Entity("licenses")
export class License extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Generated("uuid")
    uuid: string;

    @Column()
    name: string;
    
    @Column()
    price: number;
    
    @Column({ default: 30 })
    durationDays: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Feature, feature => feature.licenses)
    features: Feature[];

    @OneToMany(() => LicenseUser, licenseUser => licenseUser.license)
    usersRelation: LicenseUser[]
}