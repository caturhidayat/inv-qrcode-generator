import {
    Textarea,
    Input,
    Box,
    Flex,
    FormLabel,
    Button,
    FormHelperText,
    FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { decryption } from "@/utils/encrypt-invoice";
import { useState } from "react";

export default function DecryptForm() {
    const [decrypted, setDecrypted]= useState(null)
    // Handle SUbmit Data
    const submitData = async (data) => {
        const jsonForDecrypt = {
            decryption_text: data.decryption_text,
            secret_key: data.secret_key,
            secret_iv: "",
            key_size: 128,
            output_type: "Base64",
            mode: "CBC",
        };
        const decryptionValue =  decryption(jsonForDecrypt)
        console.log(decryptionValue)
        setDecrypted(decryptionValue)

    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <Box my='5'>
            <Flex gap='10' justifyContent='center'>
                <Box width='450px'>
                    <form onSubmit={handleSubmit(submitData)}>
                        <FormControl>
                            <FormLabel>Input Encryptd Text</FormLabel>
                            <Textarea
                                {...register("decryption_text")}
                                size='md'
                                width='450px'
                            />
                            <FormHelperText>
                                Input text encrypted in here to decrypt 🔓
                            </FormHelperText>
                            <FormLabel my='5'>Input Key :</FormLabel>
                            <Input {...register("secret_key")} />
                            <Button type="submit" my='4' colorScheme='orange'>
                                Decrypt
                            </Button>
                        </FormControl>
                    </form>
                </Box>
                <Box width='450px'>
                    <FormLabel>Decrypted Text</FormLabel>
                    <Textarea
                        value={decrypted}
                        size='md'
                        width='450px'
                    />
                </Box>
            </Flex>
        </Box>
    );
}
