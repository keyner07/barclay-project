import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, BeforeInsert, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { Role } from "../roles/Role.entity";
import { hashSync, compareSync } from "bcryptjs";
import { LicenseUser } from "../license/LicenseUsers.entity";
import { SearchInfo } from "../search/SearchInfo.entity";
import { Matriz } from "../matriz/matriz.entity";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated("uuid")
    uuid: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true})
    image: string;

    @Column({ unique: true, nullable: false })
    DNI: string;

    @Column()
    nationality: string;

    @Column({ unique: true, nullable: false })
    email: string;
    
    @Column({ default: null })
    entity: string;

    @Column({ default: null })
    registerCode: string;

    @Column({ default: null })
    locationId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    password: string;

    @Column()
    lastConnection: Date;

    @Column({ default: false })
    connected: boolean;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @OneToMany(() => LicenseUser, (l) => l.user)
    licensesRelation: LicenseUser[];

    @OneToMany(() => SearchInfo, (search) => search.user)
    searchList: SearchInfo[];

    @OneToMany(() => Matriz, x => x.user)
    @JoinColumn()
    matriz: Matriz;

    @BeforeInsert()
    hash() {
        return (this.password = hashSync(this.password, 10));
    }

    comparePassword(password: string) {
        const isValid = compareSync(password, this.password);

        if (isValid) {
            this.lastConnection = new Date();
            this.connected = true;
            this.save();
        }

        return isValid;
    }
}
