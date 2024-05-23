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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      no_invoice: "",
      tax_no_invoice: "",
      amount: "",
      pph: "",
      tax_amount: "",
      total: "",
    },
  });

  // Calculate Total Amount with PPH
  const calculateTotal = async () => {
    const [amount, tax_amount, pph] = getValues([
      "amount",
      "tax_amount",
      "pph",
    ]);
    const pph_amount = parseFloat(amount) * parseFloat(pph);
    const after_pph = parseFloat(amount) - parseFloat(pph_amount);
    const total = parseFloat(after_pph) + parseFloat(tax_amount);
    if (!isNaN(total)) {
      setValue("total", total);
    }
  };

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
          <label className="label" htmlFor="no_invoice">
            No Invoice
          </label>
          <input
            {...register("no_invoice")}
            placeholder="INV-01"
            className="input input-sm rounded-none input-secondary"
            type="text"
            name="no_invoice"
          />
          {errors.no_invoice && (
            <AlertInput message={errors.no_invoice.message} />
          )}
          <label className="label" htmlFor="amount">
            Amount Before Tax
          </label>
          <input
            {...register("amount", {
              valueAsNumber: true,
              onChange: () => calculateTotal(),
            })}
            placeholder="100000"
            className="input input-sm rounded-none input-secondary"
            type="number"
            name="amount"
          />
          {errors.amount && <AlertInput message={errors.amount.message} />}
          <label className="label" htmlFor="tax_amount">
            Tax Amount (PPN)
          </label>
          <input
            {...register("tax_amount", {
              valueAsNumber: true,
              onChange: () => calculateTotal(),
            })}
            placeholder="11000"
            className="input input-sm rounded-none input-secondary"
            type="number"
            name="tax_amount"
          />
          {errors.tax_amount && (
            <AlertInput message={errors.tax_amount.message} />
          )}
          <div className="flex gap-6 py-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-700"
                value={0}
                {...register("pph", {
                  valueAsNumber: true,
                  onChange: () => calculateTotal(),
                })}
              />
              <span className="label-text pl-2">0 % PPH</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-700"
                value={0.02}
                {...register("pph", {
                  valueAsNumber: true,
                  onChange: () => calculateTotal(),
                })}
                defaultChecked
              />
              <span className="label-text pl-2">2 % PPH</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-700"
                value={0.1}
                {...register("pph", {
                  valueAsNumber: true,
                  onChange: () => calculateTotal(),
                })}
              />
              <span className="label-text pl-2">10 % PPH</span>
            </label>
          </div>
          <label className="label" htmlFor="total">
            Total Amount
          </label>
          <input
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
            className="input input-sm rounded-none input-secondary"
            type="number"
            name="total"
          />
          {errors.total && <AlertInput message={errors.total.message} />}
          <label className="label" htmlFor="tax_no_invoice">
            Tax Invoice Number
          </label>
          <input
            {...register("tax_no_invoice")}
            placeholder="0"
            className="input input-sm rounded-none input-secondary"
            type="text"
            name="tax_no_invoice"
          />
          {errors.tax_no_invoice && (
            <AlertInput message={errors.tax_no_invoice.message} />
          )}
          <div className="py-6 grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
            <button
              className="btn btn-sm rounded-none bg-blue-800 text-white btn-block"
              type="submit"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : null}
              {isSubmitting ? "Generating..." : "Generate"}
            </button>
            {isSubmitSuccessful && (
              <button
                className="btn btn-sm rounded-none bg-orange-500 btn-block"
                onClick={() => reset()}
              >
                Reset Form
              </button>
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
