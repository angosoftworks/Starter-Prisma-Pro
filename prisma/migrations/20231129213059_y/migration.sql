/*
  Warnings:

  - The `customer_id` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_customer_id_key" ON "organizations"("customer_id");
