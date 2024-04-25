/*
  Warnings:

  - A unique constraint covering the columns `[company_id,name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id,slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "company_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_company_id_name_key" ON "products"("company_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "products_company_id_slug_key" ON "products"("company_id", "slug");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
