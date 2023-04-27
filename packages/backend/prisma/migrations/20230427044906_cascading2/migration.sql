-- DropForeignKey
ALTER TABLE "misshai_account" DROP CONSTRAINT "misshai_account_misskey_session_id_fkey";

-- AddForeignKey
ALTER TABLE "misshai_account" ADD CONSTRAINT "misshai_account_misskey_session_id_fkey" FOREIGN KEY ("misskey_session_id") REFERENCES "misskey_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
