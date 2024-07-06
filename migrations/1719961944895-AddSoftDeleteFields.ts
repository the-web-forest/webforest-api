import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteFields1719961944895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE volunteer
            ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
            ADD COLUMN created_at TIMESTAMP NOT NULL,
            ADD COLUMN updated_at TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE volunteer
            DROP COLUMN is_deleted,
            DROP COLUMN created_at,
            DROP COLUMN updated_at`);
    }

}
