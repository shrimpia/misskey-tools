import {MigrationInterface, QueryRunner} from 'typeorm';

export class rating1609948116186 implements MigrationInterface {
	name = 'rating1609948116186'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "user" ADD "prevRating" real NOT NULL DEFAULT 0');
		await queryRunner.query('ALTER TABLE "user" ADD "rating" real NOT NULL DEFAULT 0');
		await queryRunner.query('ALTER TABLE "user" ADD "bannedFromRanking" boolean NOT NULL DEFAULT false');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "bannedFromRanking"');
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "rating"');
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "prevRating"');
	}

}
