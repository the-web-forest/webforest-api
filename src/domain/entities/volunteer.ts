import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role';
import { ActivationRequest } from './activation.request';

@Entity('volunteer')
export class Volunteer extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: 'id', nullable: false, primary: true })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'linkedin_url', nullable: true })
  linkedInUrl: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;
}
