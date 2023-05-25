/*
  Warnings:

  - You are about to alter the column `amount_before_tax` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `tax_invoice_amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `luxury_tax_amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `pph_tax_amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `total_invoice_amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "tax_invoice_no" SET DATA TYPE TEXT,
ALTER COLUMN "amount_before_tax" SET DATA TYPE INTEGER,
ALTER COLUMN "tax_invoice_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "luxury_tax_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "pph_tax_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "total_invoice_amount" SET DATA TYPE INTEGER;
