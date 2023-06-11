import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Box
      bg="gray.800"
      mt="80px"
      p="30px"
      // position='fixed'
      bottom="0"
      width="100%"
    >
      <Box
        display="flex"
        color="white"
        pt="20px"
        alignContent="center"
        justifyContent="center"
      >
        <p>Made with ton love ❤️ </p>
        <Text
          fontSize="sm"
          bgGradient="linear(to-l, #fb843f, #e546fc)"
          bgClip="text"
          // fontSize='6xl'
          fontWeight="extrabold"
        >
          @Bekasi
        </Text>
        <br />
      </Box>
      <Box display="flex" justifyContent="center">
        <Text
          // fontSize="sm"
          // bgGradient="linear(to-l, #22c1c3, #fdbb2d)"
          // bgClip="text"
          // fontSize='6xl'
          // fontWeight="extrabold"
        >
          Catur Hidayat - 2023
        </Text>
      </Box>
    </Box>
  );
}
