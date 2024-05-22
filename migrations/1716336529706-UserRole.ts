import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1716336529706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE user_role (user_id integer NOT NULL,role_id integer NOT NULL)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user_role`);
    }

}
