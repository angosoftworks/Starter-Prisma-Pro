/*
  Warnings:

  - You are about to drop the column `primary_email` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `owner_user_id` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `todos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `todos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "primary_email",
ADD COLUMN     "owner_user_id" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "todos" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
