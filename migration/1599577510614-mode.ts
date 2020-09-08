import {MigrationInterface, QueryRunner} from 'typeorm';

export class mode1599577510614 implements MigrationInterface {
    name = 'mode1599577510614'

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('CREATE TYPE "user_alertmode_enum" AS ENUM(\'note\', \'notification\', \'nothing\')');
    	await queryRunner.query('ALTER TABLE "user" ADD "alertMode" "user_alertmode_enum" NOT NULL DEFAULT \'note\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "user" DROP COLUMN "alertMode"');
    	await queryRunner.query('DROP TYPE "user_alertmode_enum"');
    }

}
