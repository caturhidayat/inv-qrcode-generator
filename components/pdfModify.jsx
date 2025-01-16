import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertInput from "./AlertInput";
import { PDFDocument } from "pdf-lib";
import { FileSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function PdfModify({ qrcode }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FileSchema),
  });
  const [pdffile, setPdffile] = useState("");

  // Handle Submit
  const onSubmit = (data) => {
    if (data.files.length > 0) {
      handleOnChangeInput();
    }
    console.log(data);
  };

  // Handle Chanage on Input File
  const handleOnChangeInput = () => {
    const value = getValues();

    const file = value.files[0];

    // Reading File selected
    const reader = new FileReader();

    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const pngImageBytes = await fetch(qrcode).then((res) =>
        res.arrayBuffer()
      );

      // TODO: Load a PDFFoc from existing PDF Bytes
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // TODO: Embed PNG image bytes
      const pngImage = await pdfDoc.embedPng(pngImageBytes);

      // TODO: Get First Page of the doc
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // TODO: Get The width and height the first page
      const { width, height } = firstPage.getSize();

      // TODO: Draw/Embed PNG image QR to PDF
      firstPage.drawImage(pngImage, {
        x: width / 14 - 10, // Calculate page size
        y: height / 4 + 30, // Calculate page size
        width: 130, // Positioning Cordinate to placement QR
        height: 130, // Positioning Cordinate to placement QR
      });

      // TODO: Serialize the PDFDoc to bytes (a Unit8Array)
      const pdfBytes = await pdfDoc.save();

      setPdffile(pdfBytes);
    };

    reader.readAsArrayBuffer(file);
  };

  // Function fot Download PDF File after QR Embbeded
  const downloadPDF = () => {
    const url = window.URL.createObjectURL(new Blob([pdffile]));
    const urlObject = document.createElement("a");
    urlObject.href = url;
    urlObject.setAttribute("download", "invoice.pdf");
    document.body.appendChild(urlObject);
    urlObject.click();
  };

  return (
    <div className="flex justify-center content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <Label className="form-control w-full max-w-xs">
            <p className="py-2">Please Select PDF File</p>
            <Input
              type="file"
              className="w-full max-w-xs"
              id="fileupload"
              {...register("files")}
            />
          </Label>
          {errors.files && <AlertInput message={errors.files.message} />}
        </div>

        <Button type="submit">Embed</Button>

        <br />
        {pdffile ? (
          <div>
            <Button onClick={downloadPDF}>Download PDF</Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
