import {MigrationInterface, QueryRunner} from 'typeorm';

export class template1609941393782 implements MigrationInterface {
  name = 'template1609941393782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "template" character varying(280)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "template"');
  }

}
