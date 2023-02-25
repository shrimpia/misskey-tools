import {MigrationInterface, QueryRunner} from 'typeorm';

export class addTokenVersion1643366857976 implements MigrationInterface {
  name = 'addTokenVersion1643366857976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "tokenVersion" integer NOT NULL DEFAULT 1');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "tokenVersion"');
  }

}
