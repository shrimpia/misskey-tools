import {MigrationInterface, QueryRunner} from 'typeorm';

export class useRanking1651804009671 implements MigrationInterface {
  name = 'useRanking1651804009671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "useRanking" boolean NOT NULL DEFAULT false');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "useRanking"');
  }
}
