-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "access_token" VARCHAR NOT NULL,
    "email" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "misskey_session" (
    "id" TEXT NOT NULL,
    "username" VARCHAR NOT NULL,
    "host" VARCHAR NOT NULL,
    "token" VARCHAR NOT NULL,
    "tokenVersion" INTEGER NOT NULL,
    "accountId" VARCHAR NOT NULL,

    CONSTRAINT "misskey_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "misshai_account" (
    "misskey_session_id" TEXT NOT NULL,
    "alert_as_note" BOOLEAN NOT NULL DEFAULT false,
    "alert_as_notificaton" BOOLEAN NOT NULL DEFAULT true,
    "note_visibility" TEXT NOT NULL DEFAULT 'home',
    "note_local_only" BOOLEAN NOT NULL DEFAULT false,
    "template" VARCHAR(1024),
    "banned_from_ranking" BOOLEAN NOT NULL DEFAULT false,
    "ranking_visible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "misshai_account_pkey" PRIMARY KEY ("misskey_session_id")
);

-- CreateTable
CREATE TABLE "misshai_record" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "notes_count" INTEGER NOT NULL,
    "following_count" INTEGER NOT NULL,
    "followers_count" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "misshai_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_access_token_key" ON "account"("access_token");

-- AddForeignKey
ALTER TABLE "misskey_session" ADD CONSTRAINT "misskey_session_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "misshai_account" ADD CONSTRAINT "misshai_account_misskey_session_id_fkey" FOREIGN KEY ("misskey_session_id") REFERENCES "misskey_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "misshai_record" ADD CONSTRAINT "misshai_record_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "misshai_account"("misskey_session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
