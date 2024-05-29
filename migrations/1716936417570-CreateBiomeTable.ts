import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBiomeTable1716936417570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE biome (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS biome`);
    }

}
