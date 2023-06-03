import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { Analytics } from '@vercel/analytics/react'


export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <link rel='icon' href="/public/favicon.ico" />
            <Component {...pageProps} />
            <Analytics />
        </ChakraProvider>
    );
}
