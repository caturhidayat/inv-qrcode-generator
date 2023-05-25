import React from "react";

export default function serializeInvoice(data) {
    const {
        invoice_no,
        tax_invoice_no,
        amount_before_tax,
        tax_invoice_amount,
        luxury_tax_amount,
        pph_tax_amount,
        total_invoice_amount,
    } = data;

    // parse Data to each field structure QR Code
    const SYSTEM_IDENTIFICATION = "VISION";
    const SUPP_INV_NO = tax_invoice_no;
    const AMOUNT_BEFORE_TAX = Number(amount_before_tax);
    const TOTAL_INVOICE_AMOUNT = Number(total_invoice_amount);
    const INV_TAX_AMOUNT = Number(tax_invoice_amount);
    const INV_TAX_NO = Number(invoice_no);

    const invoiceData = `${SYSTEM_IDENTIFICATION}|${SUPP_INV_NO}|${AMOUNT_BEFORE_TAX.toFixed(
        2
    )}|${TOTAL_INVOICE_AMOUNT.toFixed(2)} |${INV_TAX_AMOUNT.toFixed(
        2
    )}|${INV_TAX_NO}`;

    // console.log(invoiceData.replace(/\s/g, ''));
    const qr_content = invoiceData.replace(/\s/g, '')
    return qr_content;
}
