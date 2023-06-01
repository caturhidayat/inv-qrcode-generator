import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { Analytics } from '@vercel/analytics/react'


export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            <Analytics />
        </ChakraProvider>
    );
}
