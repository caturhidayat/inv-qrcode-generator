import { z } from "zod";

// TODO: Form Validation
export const FormSchema = z.object({
  invoice_no: z.string(),
  tax_invoice_no: z.string().max(16),
  // tax_invoice_no: z
  //     .number()
  //     .nonnegative()
  //     .lte(9999999999999999, {
  //         message: "Number can't be more than 16 digits",
  //     }),
  amount_before_tax: z.number().nonnegative().lte(9999999999999999, {
    message: "Number can't be more than 16 digits",
  }),
  tax_invoice_amount: z.number().nonnegative().lte(9999999999999999, {
    message: "Number can't be more than 16 digits",
  }),
  luxury_tax_amount: z.number().nonnegative().lte(9999999999999999, {
    message: "Number can't be more than 16 digits",
  }),
  pph_tax_amount: z.number().nonnegative().lte(9999999999999999, {
    message: "Number can't be more than 16 digits",
  }),
  total_invoice_amount: z.number().nonnegative().lte(9999999999999999, {
    message: "Number can't be more than 16 digits",
  }),
});

// TODO: Validate File Input
const MAX_FILE_SIZE = 3000000;
function checkFileType(file) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "pdf" || fileType === "PDF") {
      return true;
    }
  }
  return false;
}

export const FileSchema = z.object({
  files: z
    .any()
    .refine((files) => files.length !== 0, {
      message: "File is required 🗳",
    })
    .refine((files) => files.size < MAX_FILE_SIZE, {
      message: "Max size is 3MB",
    })
    .refine((files) => checkFileType(files), {
      message: "Only PDF file format are supported",
    }),
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
