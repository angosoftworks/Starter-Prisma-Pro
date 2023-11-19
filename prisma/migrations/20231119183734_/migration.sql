/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `org_name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_org_id_fkey";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "org_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_name_key" ON "organizations"("id", "name");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_org_id_org_name_fkey" FOREIGN KEY ("org_id", "org_name") REFERENCES "organizations"("id", "name") ON DELETE RESTRICT ON UPDATE NO ACTION;
