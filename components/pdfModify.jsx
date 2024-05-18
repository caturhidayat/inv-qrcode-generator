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
  const [pdffile, setPdffile] = useState("");

  const onSubmit = (data) => {
    if (data.files.length > 0) {
      handleOnChangeInput()
    }
    console.log(data);
  };

  const handleOnChangeInput = () => {
    const value = getValues();

    const file = value.files[0];

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

      // TODO: Draw PNG image to PDF
      firstPage.drawImage(pngImage, {
        x: width / 14 - 10,
        y: height / 4 + 30,
        width: 130,
        height: 130,
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
    <div className="flex justify-center content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <label className="form-control w-full max-w-xs">
            <p className="py-2">Please Select PDF File</p>
            <input
              type="file"
              className="file-input file-input-sm file-input-bordered w-full max-w-xs"
              id="fileupload"
              {...register("files")}
            />
          </label>
        {errors.files && <AlertInput message={errors.files.message} />}
        </div>

        <button className="btn btn-sm bg-blue-800 text-white btn-block" type="submit">
          Embed
        </button>

        <br />
        {pdffile ? (
          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-blue-800 text-white"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
