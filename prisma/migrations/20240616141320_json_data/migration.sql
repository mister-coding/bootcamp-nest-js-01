-- AlterTable
ALTER TABLE "User" ADD COLUMN     "data" JSONB;

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");
