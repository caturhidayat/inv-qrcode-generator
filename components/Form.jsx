import AlertInput from "./AlertInput";
import {
  Input,
  FormLabel,
  Button,
  Heading,
  Box,
  FormControl,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import serializeInvoice from "@/utils/serialize";
import { encryption } from "@/utils/encrypt-invoice";
import { useState } from "react";
import axios from "axios";
import PdfModify from "./pdfModify";
import { FormSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { VISION_KEY } from "@/constant";

export default function Form() {
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
      invoice_no: "",
      tax_invoice_no: "",
      amount_before_tax: "",
      tax_invoice_amount: "",
      // luxury_tax_amount: 0,
      // pph_tax_amount: 0,
      total_invoice_amount: "",
    },
  });

  // const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);

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
    <>
      <Flex
        flexDir={{
          base: "column",
          md: "row",
        }}
        justifyContent="center"
        // align="center"
        gap={{
          base: "1",
          md: "10",
        }}
      >
        <Box
          my={{
            base: "4",
            md: "10",
          }}
        >
          <Heading size="md" pb={"4"}>
            Input Data Here : 👇🏼
          </Heading>
          <form onSubmit={handleSubmit(submitData)}>
            <FormControl>
              <FormLabel htmlFor="invoice_no">No. Invoice</FormLabel>
              <Input
                {...register("invoice_no")}
                placeholder="INV-01"
                type="text"
                name="invoice_no"
                size={"sm"}
              />
              {errors.invoice_no && (
                <AlertInput message={errors.invoice_no.message} />
              )}

              <FormLabel htmlFor="amount_before_tax">
                Amount Before Tax (Sub Total)
              </FormLabel>
              <Input
                {...register("amount_before_tax", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const [tax_invoice_amount] = getValues(['tax_invoice_amount'])
                    const total_amount = (parseFloat(e.target.value) + parseFloat(tax_invoice_amount))
                    if(!isNaN(total_amount)){
                      setValue('total_invoice_amount', total_amount)
                    }
                  }
                })}
                placeholder="100000"
                type="number"
                size={"sm"}
              />
              {errors.amount_before_tax && (
                <AlertInput message={errors.amount_before_tax.message} />
              )}

              <FormLabel htmlFor="tax_invoice_amount">
                Tax Amount (PPN)
              </FormLabel>
              <Input
                {...register("tax_invoice_amount", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const [amount_before_tax] = getValues(['amount_before_tax'])
                    const total_amount = (parseFloat(e.target.value) + parseFloat(amount_before_tax))
                    if(!isNaN(total_amount)){
                      setValue('total_invoice_amount', total_amount)
                    }
                  }
                })}
                placeholder="11000"
                type="number"
                size={"sm"}
              />
              {errors.tax_invoice_amount && (
                <AlertInput message={errors.tax_invoice_amount.message} />
              )}

              {/* <FormLabel htmlFor="luxury_tax_amount">
                Luxury Tax Amoount
              </FormLabel>
              <Input
                {...register("luxury_tax_amount", {
                  valueAsNumber: true,
                })}
                type="number"
                size={"sm"}
              />
              {errors.luxury_tax_amount && (
                <AlertInput message={errors.luxury_tax_amount.message} />
              )} */}

              {/* <FormLabel htmlFor="pph_tax_amount">PPN Amount</FormLabel>
              <Input
                {...register("pph_tax_amount", {
                  valueAsNumber: true,
                })}
                type="number"
                size={"sm"}
              />
              {errors.pph_tax_amount && (
                <AlertInput message={errors.pph_tax_amount.message} />
              )} */}

              <FormLabel htmlFor="total_invoice_amount">
                Total Invoive Amount
              </FormLabel>
              <Input
                {...register("total_invoice_amount", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const [tax_invoice_amount] = getValues(['tax_invoice_amount'])
                    const amount_before_tax = (parseFloat(e.target.value) - parseFloat(tax_invoice_amount))
                    if(!isNaN(amount_before_tax)){
                      setValue('amount_before_tax', amount_before_tax)
                    }
                  }
                })}
                placeholder="111000"
                type="number"
                size={"sm"}
              />
              {errors.total_invoice_amount && (
                <AlertInput message={errors.total_invoice_amount.message} />
              )}

              <FormLabel pt={6} htmlFor="tax_invoice_no">
                Tax Invoice No
              </FormLabel>
              <Input
                {...register("tax_invoice_no")}
                placeholder="0"
                type="text"
                name="tax_invoice_no"
                size={"sm"}
              />
              {errors.tax_invoice_no && (
                <AlertInput message={errors.tax_invoice_no.message} />
              )}

              <Flex
                flexDir={{
                  base: "column",
                  md: "row",
                }}
              >
                <Button size={"sm"} type="submit" mt={4} colorScheme="teal">
                  Generate QR
                </Button>
                <Spacer />
                {isSubmitted && (
                  <>
                    <Button
                      onClick={() => reset()}
                      type="submit"
                      mt={4}
                      colorScheme="orange"
                      size={"sm"}
                    >
                      Reset Form
                    </Button>
                  </>
                )}
              </Flex>
            </FormControl>
          </form>
        </Box>
        <Box mx={"auto"}>
          {!isSubmitted ? (
            <Box>
              <Heading size="md" my="4">
                QR Code will appear here : 👇🏼
              </Heading>
            </Box>
          ) : null}
          {/* <Heading size="md" my="30" >
            QR Code will appear here : 👇🏼
          </Heading> */}
          {isSubmitSuccessful ? (
            <Flex m={"auto"} justifyContent={"center"}>
              <PdfModify qrcode={response} />
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </>
  );
}
