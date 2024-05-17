import {
  Textarea,
  Input,
  Box,
  FormLabel,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { decryption } from "@/utils/encrypt-invoice";
import { useState } from "react";
import { decryptSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertInput from "./AlertInput";

export default function DecryptForm() {
  const [decrypted, setDecrypted] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(decryptSchema),
    defaultValues: {
      decryption_text: null,
      secret_key: null,
    },
  });
  // Handle Submit Data
  const submitData = (data) => {
    const jsonForDecrypt = {
      decryption_text: data.decryption_text,
      secret_key: data.secret_key,
      secret_iv: "",
      key_size: 128,
      output_type: "Base64",
      mode: "CBC",
    };
    try {
      const decryptionValue = decryption(jsonForDecrypt);
      console.log(decryptionValue);
      setDecrypted(decryptionValue);
    } catch (error) {
      setDecrypted(error.message);
    }
  };

  return (
    <Box
      my="5"
      display={{
        sm: "column",
        md: "flex",
      }}
      gap={"4"}
    >
      <Box mx={"auto"} width={"full"}>
        <form onSubmit={handleSubmit(submitData)}>
          <FormControl>
            <FormLabel>Input Encryptd Text</FormLabel>
            <Textarea {...register("decryption_text")} width={"full"} />
            {errors.decryption_text && (
              <AlertInput message={errors.decryption_text.message} />
            )}
            <FormHelperText width={"full"} color={"gray.400"}>
              Input text encrypted in here to decrypt 🔓
            </FormHelperText>
            <FormLabel my="5">Input Key :</FormLabel>
            <Input {...register("secret_key")} width={"full"} />
            {errors.secret_key && (
              <AlertInput message={errors.secret_key.message} />
            )}
            <br />
            <Button size={"sm"} type="submit" my="4" colorScheme="orange">
              Decrypt
            </Button>
          </FormControl>
        </form>
      </Box>
      <Box mx={"auto"} width={"full"}>
        <FormLabel>Decrypted Text</FormLabel>
        <Textarea value={decrypted} width={"full"} />
      </Box>
    </Box>
  );
}
