import { MigrationInterface, QueryRunner } from "typeorm";

export class ForeignKey1716336621023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user_role ADD FOREIGN KEY (user_id) REFERENCES user (id)`);
        await queryRunner.query(`ALTER TABLE user_role ADD FOREIGN KEY (role_id) REFERENCES role (id)`);
        await queryRunner.query(`ALTER TABLE password_reset_request ADD FOREIGN KEY (user_id) REFERENCES user (id)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user_role DROP FOREIGN KEY user_role_ibfk_1;`);
        await queryRunner.query(`ALTER TABLE user_role DROP FOREIGN KEY user_role_ibfk_2;`);
        await queryRunner.query(`ALTER TABLE password_reset_request DROP FOREIGN KEY password_reset_request_ibfk_1;`);
    }

}
