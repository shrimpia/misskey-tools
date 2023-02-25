import {MigrationInterface, QueryRunner} from 'typeorm';

export class Announcement1633841235323 implements MigrationInterface {
  name = 'Announcement1633841235323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "title" character varying(128) NOT NULL, "body" character varying(8192) NOT NULL, "like" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "announcement"');
  }

}
