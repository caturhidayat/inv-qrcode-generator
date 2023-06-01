import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <Box bg='gray.100'>
            <Box
                display='flex'
                py='5px'
                alignContent='center'
                justifyContent='center'
            >
                <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='4xl'
                    fontWeight='extrabold'
                >
                    INVOICE QR-CODE GENERATOR
                </Text>
                <br />
                {/* <Heading textColor=''>INVC QR-CODE</Heading> */}
            </Box>
            <Box display='Flex' justifyContent='center'>
                <Button>
                    <Link href='/' >Home</Link>    
                </Button>
                {/* <Button>
                    <Link href='/pdf'>PDF</Link>
                </Button> */}
                <Button>
                    <Link href='/decrypt'>Decrypt</Link>
                </Button>

            </Box>
        </Box>
    );
}
