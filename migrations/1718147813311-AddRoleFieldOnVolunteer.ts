import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleFieldOnVolunteer1718147813311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          'ALTER TABLE volunteer ADD COLUMN role varchar(255) NOT NULL AFTER name',
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE volunteer DROP COLUMN role');
      }

}
