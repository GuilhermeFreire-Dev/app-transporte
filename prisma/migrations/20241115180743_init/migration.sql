/*
  Warnings:

  - You are about to drop the column `icms_outro_if` on the `Estado` table. All the data in the column will be lost.
  - Added the required column `icms_outro_uf` to the `Estado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estado" DROP COLUMN "icms_outro_if",
ADD COLUMN     "icms_outro_uf" DOUBLE PRECISION NOT NULL;
