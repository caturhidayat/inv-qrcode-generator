import prisma from "@/utils/prisma";

export default async function handler(req, res) {
    const {
        invoice_no,
        tax_invoice_no,
        amount_before_tax,
        tax_invoice_amount,
        luxury_tax_amount,
        pph_tax_amount,
        total_invoice_amount,
    } = req.body;
    const data = req.body;
    // console.log(data)
    res.json(data.amount_before_tax)
    // if (req.method === "POST") {
        // const data = await prisma.invoice.create({
        //     data: {
        //         invoice_no,
        //         tax_invoice_no,
        //         amount_before_tax,
        //         tax_invoice_amount,
        //         luxury_tax_amount,
        //         pph_tax_amount,
        //         total_invoice_amount,
        //         qr_code: 'test'
        //     },
        // });
        
        // res.json(data);
    // }
}

// invoice_no,
// tax_invoice_no,
// amount_before_tax,
// tax_invoice_amount,
// luxury_tax_amount,
// pph_tax_amount,
// total_invoice_amount
