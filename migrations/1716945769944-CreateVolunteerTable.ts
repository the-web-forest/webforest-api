import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVolunteerTable1716945769944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE volunteer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            linkedin_url VARCHAR(255) NULL UNIQUE,
            photo_url VARCHAR(255) NULL
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE volunteer`);
    }

}
