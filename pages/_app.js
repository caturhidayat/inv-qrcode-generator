import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <link rel="icon" href="/public/favicon.ico" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </ChakraProvider>
  );
}
