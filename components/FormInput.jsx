import React from "react";
import AlertInput from "./AlertInput";
import { useForm } from "react-hook-form";
import serializeInvoice from "@/utils/serialize";
import { encryption } from "@/utils/encrypt-invoice";
import { useState } from "react";
import axios from "axios";
import PdfModify from "./pdfModify";
import { FormSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { VISION_KEY } from "@/constant";
import QRCode from "./QRCode";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function FormInput() {
  // * Define State
  // const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);

  // * Define Form Using RHF
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      no_invoice: "",
      tax_no_invoice: "",
      amount: "",
      tax_amount: "",
      total: "",
    },
  });

  // * Submit Function
  const submitData = async (data) => {
    const visionKey = VISION_KEY;
    const invoice = serializeInvoice(data);
    console.log(invoice);

    const jsonForEncrypt = {
      encryption_text: invoice,
      secret_key: visionKey,
      secret_iv: "",
      key_size: 128,
      output_type: "Base64",
      mode: "CBC",
    };

    const encryptionValues = encryption(jsonForEncrypt);

    console.log(encryptionValues);

    // TODO: Generate QR Code with module
    try {
      const res = await axios.get("/api/qrcode", {
        params: { encryptionValues },
      });
      // const res = generateQRCode(encryptionValues)
      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div>
        <form onSubmit={handleSubmit(submitData)} className="form-control ">
          <Label className="label" htmlFor="no_invoice">
            No Invoice
          </Label>
          <Input
            {...register("no_invoice")}
            placeholder="INV-01"
            type="text"
            name="no_invoice"
          />
          {errors.no_invoice && (
            <AlertInput message={errors.no_invoice.message} />
          )}
          <Label className="label" htmlFor="amount">
            Amount Before Tax
          </Label>
          <Input
            {...register("amount", {
              valueAsNumber: true,
              onChange: (e) => {
                const [tax_amount] = getValues(["tax_amount"]);

                const pph23 =
                  parseFloat(e.target.value) -
                  parseFloat(e.target.value) * 0.02;
                const afterPph23 = parseFloat(e.target.value) - pph23;
                const total = parseFloat(afterPph23) + parseFloat(tax_amount);
                if (!isNaN(total)) {
                  setValue("total", total);
                }
              },
            })}
            placeholder="100000"
            type="number"
            name="amount"
          />
          {errors.amount && <AlertInput message={errors.amount.message} />}
          <Label className="label" htmlFor="tax_amount">
            Tax Amount (PPN)
          </Label>
          <Input
            {...register("tax_amount", {
              valueAsNumber: true,
              onChange: (e) => {
                const [amount] = getValues(["amount"]);
                const pph23 = parseFloat(amount) * 0.02;
                const afterPph23 = parseFloat(amount) - pph23;
                const total =
                  parseFloat(e.target.value) + parseFloat(afterPph23);
                if (!isNaN(total)) {
                  setValue("total", total);
                }
              },
            })}
            placeholder="11000"
            type="number"
            name="tax_amount"
          />
          {errors.tax_amount && (
            <AlertInput message={errors.tax_amount.message} />
          )}
          <Label className="label" htmlFor="total">
            Total Amount
          </Label>
          <Input
            {...register("total", {
              valueAsNumber: true,
              onChange: (e) => {
                const [tax_amount] = getValues(["tax_amount"]);
                const amount =
                  parseFloat(e.target.value) - parseFloat(tax_amount);
                if (!isNaN(amount)) {
                  setValue("amount", amount);
                }
              },
            })}
            placeholder="111000"
            type="number"
            name="total"
          />
          {errors.total && <AlertInput message={errors.total.message} />}
          <Label className="label" htmlFor="tax_no_invoice">
            Tax Invoice Number
          </Label>
          <Input
            {...register("tax_no_invoice")}
            placeholder="0"
            type="text"
            name="tax_no_invoice"
          />
          {errors.tax_no_invoice && (
            <AlertInput message={errors.tax_no_invoice.message} />
          )}
          <div className="py-6 grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
            <Button type="submit">Generate</Button>
            {isSubmitSuccessful && (
              <Button variant="destructive" onClick={() => reset()}>
                Reset Form
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        {isSubmitSuccessful ? (
          <div className="flex gap-4 mt-4">
            <QRCode qrcode={response} />
            <PdfModify qrcode={response} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
