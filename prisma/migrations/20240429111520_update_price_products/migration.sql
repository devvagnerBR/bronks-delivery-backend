/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - Added the required column `price_g` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_m` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_p` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
ADD COLUMN     "price_g" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_m" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_p" DOUBLE PRECISION NOT NULL;
