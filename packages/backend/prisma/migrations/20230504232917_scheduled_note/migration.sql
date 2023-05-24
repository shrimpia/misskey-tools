-- CreateTable
CREATE TABLE "scheduled_note" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "text" TEXT NOT NULL,
    "cw" TEXT,
    "local_only" BOOLEAN NOT NULL,
    "visibility" TEXT NOT NULL,
    "visible_user_ids" TEXT[],
    "misskey_session_id" TEXT NOT NULL,

    CONSTRAINT "scheduled_note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scheduled_note_misskey_session_id_key" ON "scheduled_note"("misskey_session_id");

-- AddForeignKey
ALTER TABLE "scheduled_note" ADD CONSTRAINT "scheduled_note_misskey_session_id_fkey" FOREIGN KEY ("misskey_session_id") REFERENCES "misskey_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
