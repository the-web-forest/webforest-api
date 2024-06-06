import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class News extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', nullable: false })
    title: string;

    @Column({ name: 'url', nullable: false })
    url: string;

    @Column({ name: 'image_url', nullable: false })
    imageUrl: string;

    @Column({ name: 'publish_date', nullable: false })
    publishDate: Date;

    @Column({ name: 'is_deleted', nullable: false, default: false })
    isDeleted: Date;

    @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date;
}