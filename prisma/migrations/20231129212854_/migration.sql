/*
  Warnings:

  - You are about to drop the column `stripe_customer_id` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "organizations_stripe_customer_id_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "stripe_customer_id",
ADD COLUMN     "customer_id" VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_customer_id_key" ON "organizations"("customer_id");
