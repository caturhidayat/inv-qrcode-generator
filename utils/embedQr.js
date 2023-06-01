
import { PDFDocument } from "pdf-lib";

export async function embedQr(file, qrcode) {

    try {
        const reader = new FileReader();

        reader.onload = async () => {
            // console.log(reader.result)
            const arrayBuffer = reader.result;
            console.log(arrayBuffer);
            const pngImageBytes = await fetch(qrcode).then((res) =>
                res.arrayBuffer()
            );

            // TODO: Load a PDFFoc from existing PDF Bytes
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // TODO: add a blank page to PDF file
            // const page = pdfDoc.addPage()
            // page.moveTo(100, page.getHeight() -5)

            // TODO: Embed PNG image bytes
            const pngImage = await pdfDoc.embedPng(pngImageBytes);

            // const helvetica = await pdfDoc.embedStandardFont(
            //     StandardFonts.Helvetica
            // );
            // TODO: Get First Page of the doc
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            // TODO: Get The width and height the first page
            const { width, height } = firstPage.getSize();

            // TODO: Draw SVG to PDF
            // firstPage.moveDown(20)
            // firstPage.drawImage(qrcode)
            // firstPage.drawSvgPath(qrcode, { x: 5, y: 5});
            // console.log({ qr: qrcode });

            // SVGtoPDF(firstPage, qrcode, 5, 5)

            // TODO: Draw PNG image to PDF
            firstPage.drawImage(pngImage, {
                x: width / 14 - 10,
                y: height / 4 + 30,
                width: 150,
                height: 150,
            });

            // TODO: Serialize the PDFDoc to bytes (a Unit8Array)
            const pdfBytes = await pdfDoc.save();

            // setPdffile(pdfBytes);
            return pdfBytes
        };

        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.log(error)
        throw new error
    }
}
