import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init1596513280623 implements MigrationInterface {
  name = 'Init1596513280623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "host" character varying NOT NULL, "token" character varying NOT NULL, "prevNotesCount" integer NOT NULL, "prevFollowingCount" integer NOT NULL, "prevFollowersCount" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_6269eebacdb25de8569298a52a" ON "user" ("username", "host") ');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_6269eebacdb25de8569298a52a"');
    await queryRunner.query('DROP TABLE "user"');
  }

}
