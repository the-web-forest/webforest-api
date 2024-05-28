import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivationRequestTable1716848915487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE activation_request (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP,
            activated_at TIMESTAMP NULL DEFAULT NULL
        )`);
        await queryRunner.query(`ALTER TABLE activation_request ADD FOREIGN KEY (user_id) REFERENCES user (id)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE activation_request`);

    }

}
