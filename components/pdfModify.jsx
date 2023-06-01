import { Box, FormLabel, Input, Button, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertInput from "./AlertInput";
import { PDFDocument } from "pdf-lib";
import { FileSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PdfModify({ qrcode }) {
    const {
        register,
        watch,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FileSchema),
    });
    // const [image, setImage] = useState("");
    const [pdffile, setPdffile] = useState("");

    const readerPdfFile = (file, cb) => {
        const read = new FileReader();
        read.onload = () => cb(null, read.result);
        read.onload = (err) => cb(err);
        read.readAsArrayBuffer(file);
    };

    const onSubmit = (data) => {
        if (data.files.length > 0) {
            // const uploaded = convert2base64(data.files[0]);
            // console.log({ up: uploaded });
        }
        console.log(data);
    };

    const handleOnChangeInput = () => {
        const value = getValues();
        // onSubmit(value)
        // readerPdfFile(value.files[0], (err, res) => {
        //     console.log(res)
        // });
        const file = value.files[0];
        // console.log({val: value, qr: qrcode})
        // console.log(c2a);

        const reader = new FileReader();

        reader.onload = async () => {
            // console.log(reader.result)
            const arrayBuffer = reader.result;
            // console.log(arrayBuffer);
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

            setPdffile(pdfBytes);
        };

        reader.readAsArrayBuffer(file);
    };

    const downloadPDF = () => {
        const url = window.URL.createObjectURL(new Blob([pdffile]));
        const urlObject = document.createElement("a");
        urlObject.href = url;
        urlObject.setAttribute("download", "invoice.pdf");
        document.body.appendChild(urlObject);
        urlObject.click();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {qrcode ? (
                    <div>
                        <Box
                            as='div'
                            border='dashed'
                            borderColor='blackAlpha.500'
                            borderRadius='10'
                            width={280}
                            height={280}
                            justifyItems='center'
                            justifyContent='center'
                        >
                            <Image
                                src={qrcode}
                                alt='qrcode'
                                width='270'
                                height='270'
                            />
                        </Box>
                        <FormLabel mt='5' htmlFor='select_file'>
                            QR Code Generated 🔥
                        </FormLabel>
                        <br />
                    </div>
                ) : null}
                {!watch("files") || watch("files").length === 0 ? (
                    <div>
                        <Input
                            py='1'
                            type='file'
                            id='fileupload'
                            {...register("files", {
                                onChange: handleOnChangeInput,
                                // onChange: (e)=> console.log(e.target.value)
                            })}
                        />
                        {errors.files && (
                            <AlertInput message={errors.files.message} />
                        )}
                        <FormLabel htmlFor='fileupload' cursor='pointer'>
                            Please Select PDF File... 📄
                        </FormLabel>
                    </div>
                ) : (
                    <strong>{watch("files")[0].name}</strong>
                )}
                <br />
                {pdffile ? (
                    <Box>
                        <Text>embedded QR to PDF already done!!! 🎉</Text>
                        <FormLabel mt='5' htmlFor='select_file'>
                            Download PDF with QR?? 🍔🍔🍔
                        </FormLabel>
                        <Button
                            onClick={downloadPDF}
                            mt='2'
                            colorScheme='facebook'
                        >
                            Download PDF
                        </Button>
                    </Box>
                ) : null}
            </form>
        </div>
    );
}
