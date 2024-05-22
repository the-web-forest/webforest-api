import { Column, Entity, JoinTable, OneToOne, PrimaryColumn } from "typeorm";
import { Role } from "./role";
import { User } from "./user";

@Entity('user_role')
export class UserRole {
    @Column({ name: 'user_id' })
    @PrimaryColumn({ name: 'role_id' })
    userId: number;
    
    @Column({ name: 'role_id' })
    @PrimaryColumn({ name: 'role_id' })
    roleId: number;

    @OneToOne(() => User)
    @JoinTable()
    user: User;
  
    @OneToOne(() => Role)
    @JoinTable()
    role: Role;
}