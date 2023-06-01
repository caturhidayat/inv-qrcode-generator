import {
    Text,
    Textarea,
    Box,
    Flex,
    FormLabel,
    Button,
    FormHelperText,
    FormControl,
} from "@chakra-ui/react";

export default function DecryptForm() {
    return (
        <Box my='5'>
            <Flex gap='10' justifyContent='center'>
                <Box width='450px'>
                    <form>
                        <FormControl>
                            <FormLabel>Input Encryptd Text</FormLabel>
                            <Textarea
                                // onChange={handleInputChange}
                                size='md'
                                width='450px'
                            />
                            <FormHelperText>
                                Input text encrypted in here to decrypt 🔓
                            </FormHelperText>
                            <Button my='4' colorScheme='orange'>
                                Decrypt
                            </Button>
                        </FormControl>
                    </form>
                </Box>
                <Box width='450px'>
                    <FormLabel>Decrypted Text</FormLabel>
                    <Textarea
                        // onChange={handleInputChange}
                        size='md'
                        width='450px'
                    />
                </Box>
            </Flex>
        </Box>
    );
}
