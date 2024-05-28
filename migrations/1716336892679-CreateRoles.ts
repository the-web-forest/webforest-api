import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoles1716336892679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO role (id, name) VALUES ('1', 'Admin'), ('2', 'User')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM user_role WHERE role_id = 1`);
        await queryRunner.query(`DELETE FROM user_role WHERE role_id = 2`);
        await queryRunner.query(`DELETE FROM role WHERE id = '2';`);
        await queryRunner.query(`DELETE FROM role WHERE id = '1';`);
    }

}
