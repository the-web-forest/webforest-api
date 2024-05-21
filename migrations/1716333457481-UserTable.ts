import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1716333457481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE user (id integer PRIMARY KEY AUTO_INCREMENT, first_name varchar(255) NOT NULL, last_name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL, is_active bool NOT NULL DEFAULT true, is_deleted bool NOT NULL DEFAULT false, created_at timestamp NOT NULL, updated_at timestamp NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user`);
    }

}
