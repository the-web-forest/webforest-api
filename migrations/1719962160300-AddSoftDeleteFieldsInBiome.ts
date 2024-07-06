import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteFieldsInBiome1719962160300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE biome
            ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE biome
            DROP COLUMN is_deleted
        `);
    }

}
