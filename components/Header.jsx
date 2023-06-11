import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useColorMode, useColorModeValue} from '@chakra-ui/react'


export default function Header() {
  const {colorMode, toggleColorMode} = useColorMode();
  const bg = useColorModeValue('blue.800', 'blue.200')
  const color = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={bg}>
      <Box
        display="flex"
        py="5px"
        alignContent="center"
        justifyContent="center"
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          INVOICE QR-CODE GENERATOR
        </Text>
        <br />
        {/* <Heading textColor=''>INVC QR-CODE</Heading> */}
      </Box>
      <Box display="Flex" justifyContent="center">
        <Button bg={bg} color={color}>
          <Link href="/">Home</Link>
        </Button>
        {/* <Button>
                    <Link href='/pdf'>PDF</Link>
                </Button> */}
        <Button bg={bg} color={color}>
          <Link href="/decrypt">Decrypt</Link>
        </Button>
          <Button bg={bg} color={color} onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
      </Box>
    </Box>
  );
}
