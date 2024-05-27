import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";
import { User } from "./user";

@Entity('activation_request')
export class ActivationRequest extends BaseEntity {

    @Column({ name: 'id' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'hash' })
    hash: string;

    @Column({ name: 'created_at', })
    createdAt: Date;

    @Column({ name: 'activated_at' })
    activatedAt: Date;

    @ManyToOne(user => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;
}