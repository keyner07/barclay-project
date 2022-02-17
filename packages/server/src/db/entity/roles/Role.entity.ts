import { BaseEntity, Column, CreateDateColumn, Entity, Generated, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "../permissions/Permission.entity";
import { User } from "../users/User.entity";


@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => User, user => user.role)
    users: User[];

    @ManyToMany(() => Permission, p => p.roles)
    permissions: Permission[]
}