import React from "react";

export default function serializeInvoice(data) {
  const { no_invoice, tax_no_invoice, amount, tax_amount, total } = data;

  // parse Data to each field structure QR Code
  const SYSTEM_IDENTIFICATION = "VISION";
  const SUPP_INV_NO = no_invoice;
  const AMOUNT_BEFORE_TAX = Number(amount);
  const TOTAL_INVOICE_AMOUNT = Number(total);
  const INV_TAX_AMOUNT = Number(tax_amount);
  const INV_TAX_NO = tax_no_invoice;

  const SYSTEM_ID = SYSTEM_IDENTIFICATION.toString();

  const invoiceData = `${SYSTEM_ID}|${SUPP_INV_NO}|${AMOUNT_BEFORE_TAX.toFixed(
    2
  )}|${TOTAL_INVOICE_AMOUNT.toFixed(2)} |${INV_TAX_AMOUNT.toFixed(
    2
  )}|${INV_TAX_NO}`;

  // console.log(invoiceData.replace(/\s/g, ''));
  const qr_content = invoiceData.replace(/\s/g, "");
  return qr_content;
}
