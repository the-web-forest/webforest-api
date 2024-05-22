import { MigrationInterface, QueryRunner } from "typeorm";

export class Role1716336505684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE role ( id integer PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE role`);
    }

}
