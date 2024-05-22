import { Column, Entity } from "typeorm";

@Entity('user_role')
export class UserRole {
    @Column({ name: 'user_id' })
    userId: number;
    @Column({ name: 'role_id' })
    roleId: number;
}