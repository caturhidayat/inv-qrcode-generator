import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Form from "@/components/Form";
import { Heading } from "@chakra-ui/react";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <main className={`${styles.main}`}>
                <Heading>INVC QR-CODE</Heading>
                <Form />
            </main>
        </>
    );
}
