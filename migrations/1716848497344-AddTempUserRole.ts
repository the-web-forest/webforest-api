import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTempUserRole1716848497344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO role (id, name) VALUES ('3', 'TempUser')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM role WHERE id = '3';`);
    }

}
