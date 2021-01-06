import {MigrationInterface, QueryRunner} from 'typeorm';

export class visibility1609938844427 implements MigrationInterface {
	name = 'visibility1609938844427'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TYPE "user_visibility_enum" AS ENUM(\'public\', \'home\', \'followers\', \'users\')');
		await queryRunner.query('ALTER TABLE "user" ADD "visibility" "user_visibility_enum" NOT NULL DEFAULT \'home\'');
		await queryRunner.query('ALTER TABLE "user" ADD "localOnly" boolean NOT NULL DEFAULT false');
		await queryRunner.query('ALTER TABLE "user" ADD "remoteFollowersOnly" boolean NOT NULL DEFAULT false');
		await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" SET DEFAULT \'notification\'');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" SET DEFAULT \'note\'');
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "remoteFollowersOnly"');
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "localOnly"');
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "visibility"');
		await queryRunner.query('DROP TYPE "user_visibility_enum"');
	}

}
