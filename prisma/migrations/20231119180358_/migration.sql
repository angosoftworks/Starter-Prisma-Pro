/*
  Warnings:

  - Added the required column `role` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Made the column `period_ends_at` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `org_id` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `todos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "role" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "period_ends_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "org_id" TEXT NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
