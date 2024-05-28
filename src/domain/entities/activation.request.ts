import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity('activation_request')
export class ActivationRequest extends BaseEntity {
  @Column({ name: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'hash' })
  hash: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'activated_at', nullable: true })
  activatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
