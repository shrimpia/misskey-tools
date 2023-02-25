import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init21596514165166 implements MigrationInterface {
  name = 'Init21596514165166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "prevNotesCount" SET DEFAULT 0');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "prevFollowingCount" SET DEFAULT 0');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "prevFollowersCount" SET DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "prevFollowersCount" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "prevFollowingCount" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "prevNotesCount" DROP DEFAULT');
  }

}
