import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useColorMode, useColorModeValue} from '@chakra-ui/react'


export default function Header() {
  const {colorMode, toggleColorMode} = useColorMode();
  const bg = useColorModeValue('teal.300', 'blue.800')
  const color = useColorModeValue('gray.800', 'gray.200')

  return (
    <Box bg={bg}>
      <Box
        display="flex"
        py="5px"
        alignContent="center"
        justifyContent="center"
      >
        <Text
          bgGradient="linear(to-l, #fb843f, #e546fc)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
        >
          INVOICE QR-CODE GENERATOR
        </Text>
        <br />
        {/* <Heading textColor=''>INVC QR-CODE</Heading> */}
      </Box>
      <Box display="Flex" justifyContent="center">
        <Button bg={bg} color={color} _hover={{ bg:{bg}}}>
          <Link href="/">Home</Link>
        </Button>
        {/* <Button>
                    <Link href='/pdf'>PDF</Link>
                </Button> */}
        <Button bg={bg} color={color} _hover={{ bg:{bg}}}>
          <Link href="/decrypt">Decrypt</Link>
        </Button>
          <Button bg={bg} color={color} _hover={{ bg:{bg}}} onClick={toggleColorMode}>
            {colorMode === 'light' ? '🌓 Dark' : '🌞 Light'} Mode
          </Button>
      </Box>
    </Box>
  );
}
