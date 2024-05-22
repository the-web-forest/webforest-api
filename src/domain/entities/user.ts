import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
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
    @Column({ name: 'created_at' })
    createdAt: Date;
    @Column({ name: 'updated_at' })
    updatedAt: Date;
}