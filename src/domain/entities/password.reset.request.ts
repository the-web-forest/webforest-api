import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('password_reset_request')
export class PasswordResetRequest {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'user_id' })
    userId: number;
    @Column({ name: 'password_reset_code' })
    passwordResetCode: string;
    @Column({ name: 'activated_at' })
    activatedAt: Date;
    @Column({ name: 'created_at' })
    createdAt: Date;
    @Column({ name: 'updated_at' })
    updatedAt: Date;
} 
