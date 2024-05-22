import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'is_deleted', default: false })
    isDeleted: boolean;

    @Column({ name: 'created_at', })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Role)
    @JoinTable({
      name: 'user_role',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
    })
    roles: Role[];
}