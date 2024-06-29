-- CreateEnum
CREATE TYPE "userLevel" AS ENUM ('Admin', 'Member');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userLevel" "userLevel" NOT NULL DEFAULT 'Member';
