import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingNewsTable1717467537666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE
        news (
          id INT NOT NULL AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          image_url VARCHAR(255) NOT NULL,
          url VARCHAR(255) NOT NULL,
          publish_date DATETIME NOT NULL,
          is_deleted TINYINT NOT NULL DEFAULT 0,
          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL,
          PRIMARY KEY (id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE news`);
    }

}
