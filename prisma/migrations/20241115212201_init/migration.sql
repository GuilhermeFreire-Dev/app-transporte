/*
  Warnings:

  - The values [REMETENTE,DESTINATARIO] on the enum `Pagador` will be removed. If these variants are still used in the database, this will fail.
  - The values [PESO,VALOR] on the enum `TipoCobranca` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Pagador_new" AS ENUM ('remetente', 'destinatario');
ALTER TABLE "Frete" ALTER COLUMN "pagador" TYPE "Pagador_new" USING ("pagador"::text::"Pagador_new");
ALTER TYPE "Pagador" RENAME TO "Pagador_old";
ALTER TYPE "Pagador_new" RENAME TO "Pagador";
DROP TYPE "Pagador_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoCobranca_new" AS ENUM ('peso', 'valor');
ALTER TABLE "Frete" ALTER COLUMN "tipo_cobranca" TYPE "TipoCobranca_new" USING ("tipo_cobranca"::text::"TipoCobranca_new");
ALTER TYPE "TipoCobranca" RENAME TO "TipoCobranca_old";
ALTER TYPE "TipoCobranca_new" RENAME TO "TipoCobranca";
DROP TYPE "TipoCobranca_old";
COMMIT;
