import {MigrationInterface, QueryRunner} from 'typeorm';

export class mypage1599570288522 implements MigrationInterface {
  name = 'mypage1599570288522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "used_token" ("token" character varying NOT NULL, CONSTRAINT "PK_7f2db4c33c33cd6b38e63393fe5" PRIMARY KEY ("token"))');
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_7f2db4c33c33cd6b38e63393fe" ON "used_token" ("token") ');
    await queryRunner.query('ALTER TABLE "user" ADD "misshaiToken" character varying NOT NULL DEFAULT \'\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "misshaiToken"');
    await queryRunner.query('DROP INDEX "IDX_7f2db4c33c33cd6b38e63393fe"');
    await queryRunner.query('DROP TABLE "used_token"');
  }

}
