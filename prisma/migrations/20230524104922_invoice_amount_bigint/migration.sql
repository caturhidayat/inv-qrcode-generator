-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "tax_invoice_amount" SET DATA TYPE BIGINT,
ALTER COLUMN "luxury_tax_amount" SET DATA TYPE BIGINT,
ALTER COLUMN "pph_tax_amount" SET DATA TYPE BIGINT,
ALTER COLUMN "total_invoice_amount" SET DATA TYPE BIGINT;
