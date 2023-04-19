-- CreateEnum
CREATE TYPE "user_alertmode_enum" AS ENUM ('note', 'notification', 'both', 'nothing');

-- CreateEnum
CREATE TYPE "user_visibility_enum" AS ENUM ('public', 'home', 'followers', 'users');

-- CreateTable
CREATE TABLE "announcement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "body" VARCHAR(8192) NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "used_token" (
    "token" VARCHAR NOT NULL,

    CONSTRAINT "PK_7f2db4c33c33cd6b38e63393fe5" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "host" VARCHAR NOT NULL,
    "token" VARCHAR NOT NULL,
    "prevNotesCount" INTEGER NOT NULL DEFAULT 0,
    "prevFollowingCount" INTEGER NOT NULL DEFAULT 0,
    "prevFollowersCount" INTEGER NOT NULL DEFAULT 0,
    "misshaiToken" VARCHAR NOT NULL DEFAULT '',
    "alertMode" "user_alertmode_enum" NOT NULL DEFAULT 'notification',
    "visibility" "user_visibility_enum" NOT NULL DEFAULT 'home',
    "localOnly" BOOLEAN NOT NULL DEFAULT false,
    "remoteFollowersOnly" BOOLEAN NOT NULL DEFAULT false,
    "template" VARCHAR(1024),
    "prevRating" REAL NOT NULL DEFAULT 0,
    "rating" REAL NOT NULL DEFAULT 0,
    "bannedFromRanking" BOOLEAN NOT NULL DEFAULT false,
    "tokenVersion" INTEGER NOT NULL DEFAULT 1,
    "useRanking" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IDX_7f2db4c33c33cd6b38e63393fe" ON "used_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_6269eebacdb25de8569298a52a" ON "user"("username", "host");

