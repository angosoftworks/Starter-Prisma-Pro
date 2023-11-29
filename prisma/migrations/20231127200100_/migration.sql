/*
  Warnings:

  - A unique constraint covering the columns `[id,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_user_id_fkey";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_id_email_key" ON "users"("id", "email");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_user_id_email_fkey" FOREIGN KEY ("user_id", "email") REFERENCES "users"("id", "email") ON DELETE RESTRICT ON UPDATE NO ACTION;
