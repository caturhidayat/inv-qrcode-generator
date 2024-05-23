import { z } from "zod";

// TODO: Form Validation
export const FormSchema = z.object({
  no_invoice: z.string().min(1, {
    message: "Invoice Number is required",
  }),
  tax_no_invoice: z
    .string()
    .min(1, {
      message: "Tax Invoice Number is required",
    })
    .max(16),
  amount: z
    .number({
      invalid_type_error: "Amount Before tax is required",
    })
    .nonnegative()
    .lte(9999999999999999, {
      message: "Number can't be more than 16 digits",
    }),
  tax_amount: z
    .number({
      invalid_type_error: "Tax Invoice Amount is required",
    })
    .nonnegative()
    .lte(9999999999999999, {
      message: "Number can't be more than 16 digits",
    }),
  pph: z.any(),
  total: z
    .number({
      invalid_type_error: "Total Amount is required",
    })
    .nonnegative()
    .lte(9999999999999999, {
      message: "Number can't be more than 16 digits",
    }),
});

// TODO: Validate File Input
export const FileSchema = z.object({
  files: z
    .any()
    .refine((files) => files.length > 0, { message: "File is required" })
    .refine(
      (files) => files.length === 0 || files[0].size <= 5 * 1024 * 1024, // 5MB
      { message: "Max file size is 5MB" }
    )
    .refine(
      (files) =>
        files.length === 0 || ["application/pdf"].includes(files[0].type),
      { message: "Only PDF files are accepted" }
    ),
});

// TODO: Validation decrypton key
const key_size = 128;
export const decryptSchema = z.object({
  decryption_text: z.string({
    required_error: "decryption text is required",
  }),
  secret_key: z.string().refine((val) => val.length * 8 === key_size, {
    message: `key Error ❌`,
  }),
});
