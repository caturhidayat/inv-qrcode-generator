import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // <Analytics />
  );
}
