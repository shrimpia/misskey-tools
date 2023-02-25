import {MigrationInterface, QueryRunner} from 'typeorm';

export class expandTemplateLength1663226831484 implements MigrationInterface {
  name = 'expandTemplateLength1663226831484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "template" TYPE character varying(1024)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "template" TYPE character varying(280)');
  }
}
