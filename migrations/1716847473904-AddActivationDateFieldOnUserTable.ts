import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActivationDateFieldOnUserTable1716847473904 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE user ADD COLUMN activated_at TIMESTAMP NULL DEFAULT NULL AFTER is_deleted');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE user DROP COLUMN activated_at');
    }

}
