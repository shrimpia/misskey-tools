-- DropForeignKey
ALTER TABLE "misshai_record" DROP CONSTRAINT "misshai_record_account_id_fkey";

-- DropForeignKey
ALTER TABLE "misskey_session" DROP CONSTRAINT "misskey_session_accountId_fkey";

-- AddForeignKey
ALTER TABLE "misskey_session" ADD CONSTRAINT "misskey_session_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "misshai_record" ADD CONSTRAINT "misshai_record_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "misshai_account"("misskey_session_id") ON DELETE CASCADE ON UPDATE CASCADE;
