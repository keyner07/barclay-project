import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Payment } from "../payment/Payment.entity";
import { User } from "../users/User.entity";
import { License } from "./License.entity";


@Entity("licenses-users")
export class LicenseUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false})
    fewDaystoFinish: boolean;
    
    @Column()
    lastPaymentReceived: Date;

    @ManyToOne(() => License, license => license.usersRelation)
    license: License;

    @ManyToOne(() => User, user => user.licensesRelation)
    user: User;

    @OneToMany(() => Payment, payment => payment.license)
    payments: Payment[];
}