import {MigrationInterface, QueryRunner} from 'typeorm';

export class alertModeBoth1644940446672 implements MigrationInterface {
  name = 'alertModeBoth1644940446672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TYPE "public"."user_alertmode_enum" RENAME TO "user_alertmode_enum_old"');
    await queryRunner.query('CREATE TYPE "user_alertmode_enum" AS ENUM(\'note\', \'notification\', \'both\', \'nothing\')');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" TYPE "user_alertmode_enum" USING "alertMode"::"text"::"user_alertmode_enum"');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" SET DEFAULT \'notification\'');
    await queryRunner.query('DROP TYPE "user_alertmode_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "user_alertmode_enum_old" AS ENUM(\'note\', \'notification\', \'nothing\')');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" TYPE "user_alertmode_enum_old" USING "alertMode"::"text"::"user_alertmode_enum_old"');
    await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "alertMode" SET DEFAULT \'notification\'');
    await queryRunner.query('DROP TYPE "user_alertmode_enum"');
    await queryRunner.query('ALTER TYPE "user_alertmode_enum_old" RENAME TO  "user_alertmode_enum"');
  }

}
