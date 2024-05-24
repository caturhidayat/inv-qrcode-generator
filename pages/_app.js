
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <link rel="icon" href="/public/favicon.ico" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </div>
  );
}
