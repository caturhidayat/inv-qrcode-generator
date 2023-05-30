import AlertInput from "./AlertInput";
import {
    Input,
    FormLabel,
    Button,
    Heading,
    Box,
    FormControl,
    NumberInput,
    NumberInputField,
    Spacer,
    Flex,
    Image
} from "@chakra-ui/react";
// import Image from "next/image";
import { useForm } from "react-hook-form";
import serializeInvoice from "@/utils/serialize";
import { encryption } from "@/utils/encrypt-invoice";
import { useState } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import PdfModify from "./pdfModify";

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm();
    // const { Image } = useQRCode();
    const [input, setInput] = useState(null);
    const [response, setResponse] = useState(null);

    // Handle On Submit
    const handleOnSubmit = (data) => {
        const invoice = fetch("/api/invoice", {
            method: "POST",
            body: data,
        });
        // invoice.then((res) => {
        //     res.data
        // }).then((inv) => {
        //     console.log(inv)
        // })
        console.log(data);
    };

    const submitData = async (data) => {
        const visionKey = "VISION0123456789";
        // const secretKey = visionKey.length * 8;
        const invoice = serializeInvoice(data);
        // console.log(invoice);

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

        // TODO: Generate QR Code with API
        // try {
        //     // setInput(encryptionValues)
        //     const res = await axios.get("/api/qrcodepro", {
        //         params: { encryptionValues },
        //     });
        //     // const res = generateQRCode(encryptionValues)
        //     console.log(res.data);
        //     setResponse(res.data);
        // } catch (error) {
        //     console.log(error);
        // }

        // TODO: Generate QR Code with module
        try {
            const res = await axios.get("/api/qrcode", {
                params: { encryptionValues },
            });
            // const res = generateQRCode(encryptionValues)
            // console.log(res.data);
            setResponse(res.data);
        } catch (error) {
            console.log(error);
        }

        // console.log({qr: qr.data})
    };

    // TODO: Standard snippet to download the QR Code
    const downloadQRCode = () => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const urlObject = document.createElement("a");
        urlObject.href = url;
        urlObject.setAttribute("download", 'file.png');
        document.body.appendChild(urlObject);
        urlObject.click();
    };

    // TODO: Download SVG as PNG
    const embedSvg2Pdf = () => {
        const pdfFile = document.getElementById("select_file");
        console.log(pdfFile);
    };

    return (
        <>
            <Flex gap='80px'>
                <Box>
                    <Heading size='lg'>Input Data Here : 👇🏼</Heading>
                    <form onSubmit={handleSubmit(submitData)}>
                        <FormControl>
                            <FormLabel htmlFor='invoice_no'>
                                No Invoice
                            </FormLabel>
                            <Input
                                {...register("invoice_no", {
                                    required: "This is required",
                                    minLength: {
                                        value: 1,
                                        message: "Minimum length is 1",
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Maximum length is 25",
                                    },
                                })}
                                type='text'
                                name='invoice_no'
                            />
                            {errors.invoice_no && (
                                <AlertInput
                                    message={errors.invoice_no.message}
                                />
                            )}

                            <FormLabel htmlFor='tax_invoice_no'>
                                Tax Inv No
                            </FormLabel>
                            <Input
                                {...register("tax_invoice_no", {
                                    required: "This is required",
                                    maxLength: {
                                        value: 16,
                                        message: "Maximum length is 16",
                                    },
                                })}
                                type='text'
                                name='tax_invoice_no'
                            />
                            {errors.tax_invoice_no && (
                                <AlertInput
                                    message={errors.tax_invoice_no.message}
                                />
                            )}

                            <FormLabel htmlFor='amount_before_tax'>
                                Amount Before Tax (GR)
                            </FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    {...register("amount_before_tax", {
                                        required: "This is required",
                                        maxLength: {
                                            value: 16,
                                            message: "Maximum length is 16",
                                        },
                                    })}
                                    type='number'
                                    name='amount_before_tax'
                                />
                            </NumberInput>
                            {errors.amount_before_tax && (
                                <AlertInput
                                    message={errors.amount_before_tax.message}
                                />
                            )}

                            <FormLabel htmlFor='tax_invoice_amount'>
                                Tax Inv Amount
                            </FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    {...register("tax_invoice_amount", {
                                        required: "This is required",
                                        maxLength: {
                                            value: 16,
                                            message: "Maximum length is 16",
                                        },
                                    })}
                                    type='number'
                                    name='tax_invoice_amount'
                                />
                            </NumberInput>
                            {errors.tax_invoice_amount && (
                                <AlertInput
                                    message={errors.tax_invoice_amount.message}
                                />
                            )}

                            <FormLabel htmlFor='luxury_tax_amount'>
                                Luxury Tax Amoount
                            </FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    {...register("luxury_tax_amount", {
                                        required: "This is required",
                                        maxLength: {
                                            value: 16,
                                            message: "Maximum length is 16",
                                        },
                                    })}
                                    type='number'
                                    name='luxury_tax_amount'
                                />
                            </NumberInput>
                            {errors.luxury_tax_amount && (
                                <AlertInput
                                    message={errors.luxury_tax_amount.message}
                                />
                            )}

                            <FormLabel htmlFor='pph_tax_amount'>
                                PPh Tax Amount
                            </FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    {...register("pph_tax_amount", {
                                        required: "This is required",
                                        maxLength: {
                                            value: 16,
                                            message: "Maximum length is 16",
                                        },
                                    })}
                                    type='number'
                                    name='pph_tax_amount'
                                />
                            </NumberInput>
                            {errors.pph_tax_amount && (
                                <AlertInput
                                    message={errors.pph_tax_amount.message}
                                />
                            )}

                            <FormLabel htmlFor='total_invoice_amount'>
                                Total Inv Amount
                            </FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    {...register("total_invoice_amount", {
                                        required: "This is required",
                                        maxLength: {
                                            value: 16,
                                            message: "Maximum length is 16",
                                        },
                                    })}
                                    type='number'
                                    name='total_invoice_amount'
                                />
                            </NumberInput>
                            {errors.total_invoice_amount && (
                                <AlertInput
                                    message={
                                        errors.total_invoice_amount.message
                                    }
                                />
                            )}
                            <Spacer />
                            <Button type='submit' mt={4} colorScheme='orange'>
                                Generate QR
                            </Button>
                            <Spacer />
                        </FormControl>
                    </form>
                </Box>
                <Box>
                    <Heading size='md' my='30'>
                        QR Code will appear here : 👇🏼
                    </Heading>
                    {response ? (
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
                                {/* <SVG src={response} /> */}
                                <Image src={response} alt="qrcode" width='270' height='270' />
                            </Box>
                            {/* <FormLabel mt='5' htmlFor='select_file'>
                                Download QR-CODE as SVG?? 🍺🍺
                            </FormLabel> */}
                            {/* <Button
                                onClick={() => downloadQRCode()}
                                my='2'
                                colorScheme='facebook'
                            >
                                Download QR
                            </Button> */}

                            <FormLabel mt='5' htmlFor='select_file'>
                                QR Code Generated 🔥
                            </FormLabel>
                            <br />
                            <PdfModify qrcode={response} />
                        </div>
                    ) : // <div>
                    //     <Box
                    //         bas='div'
                    //         border='dashed'
                    //         borderColor='blackAlpha.500'
                    //         borderRadius='10'
                    //         width={280}
                    //         height={280}
                    //     ></Box>
                    // </div>
                    null}
                </Box>
            </Flex>
        </>
    );
}
