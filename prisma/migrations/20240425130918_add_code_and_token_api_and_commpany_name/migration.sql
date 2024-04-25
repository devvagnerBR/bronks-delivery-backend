/*
  Warnings:

  - You are about to drop the column `name` on the `companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_name]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token_api]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_api` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "companies_name_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "token_api" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_name_key" ON "companies"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_code_key" ON "companies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "companies_token_api_key" ON "companies"("token_api");
