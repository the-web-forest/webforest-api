import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNickNameOnUser1716925361170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user ADD COLUMN nick_name varchar(255) NOT NULL AFTER last_name',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user DROP COLUMN nick_name');
  }
}
