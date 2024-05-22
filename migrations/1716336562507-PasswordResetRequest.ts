import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordResetRequest1716336562507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE password_reset_request (id integer PRIMARY KEY,user_id integer NOT NULL,password_reset_code varchar(255) NOT NULL,activated_at timestamp NULL DEFAULT null,created_at timestamp,updated_at timestamp)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE password_reset_request`);
    }

}
