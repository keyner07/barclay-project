import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { License } from "../license/License.entity";
import { LicenseUser } from "../license/LicenseUsers.entity";


@Entity("payments")
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ unique: true})
    transactionId: number;

    @Column()
    cardNumber: string;

    @Column()
    cardDate: Date;

    @Column()
    cardBank: string;
    
    @Column()
    via: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => LicenseUser, license => license.payments)
    license: LicenseUser;
}