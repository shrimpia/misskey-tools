/*
  Warnings:

  - A unique constraint covering the columns `[username,host]` on the table `misskey_session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "misskey_session_username_host_key" ON "misskey_session"("username", "host");
