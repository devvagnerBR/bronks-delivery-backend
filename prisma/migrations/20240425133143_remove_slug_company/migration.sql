/*
  Warnings:

  - You are about to drop the column `slug` on the `companies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "companies_slug_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "slug";
